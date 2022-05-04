import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import abi from "./utils/WavePortal.json";

function App() {
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  const [isLoadingWaves, setIsLoadingWaves] = useState("");
  const [waves, setWaves] = useState([]);

  const [isMining, setIsMining] = useState(false);
  const [message, setMessage] = useState("");

  const CONTRACT_ADDRESS = "0x6e970087eC9a5eBd1da7089d8D1907635Ce6A681";

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install metamask first");
        return;
      }

      setIsWalletConnecting(true);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Authorized Account", accounts);
      setCurrentAccount(accounts[0]);
      setIsWalletConnecting(false);
      toast.success("Wallet connected successfully!");
    } catch (error) {
      toast.error(error?.message);
      setIsWalletConnecting(false);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const waveContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          abi.abi,
          signer
        );

        setIsLoadingWaves(true);
        const allWaves = await waveContract.getAllWaves();

        const cleanedWaves = [];
        allWaves.forEach((wave) => {
          cleanedWaves.push({
            address: wave.waver,
            message: wave.message,
            timestamp: new Date(wave.timestamp * 1000).toDateString(),
          });
        });
        setWaves(cleanedWaves);
        setIsLoadingWaves(false);
        toast.success("Waves fetched successfully!");
      }
    } catch (error) {
      console.log("Error", error.message);
      setIsLoadingWaves(false);
    }
  };

  const handleSubmitWave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);
        const waveTxn = await contract.wave(message, { gasLimit: 300000 });

        // Mining started
        setIsMining(true);
        await waveTxn.wait();
        setIsMining(false);
        toast.success(`Transaction ${waveTxn.hash} mined successfully!`);
        setMessage("");
        await getAllWaves();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>👋 Hey there! </h2>
      <p>
        I am Muhammad Khizar Hayat and I'm a Full Stack web developer and
        learing blockchain. Connect your Ethereum wallet and wave at me!
      </p>

      <div className="mt-3">
        {!currentAccount && (
          <Button
            color="primary"
            onClick={connectWallet}
            disabled={isWalletConnecting}
          >
            Connect Wallet&nbsp;
            {isWalletConnecting && <Spinner size="sm" type="grow" />}
          </Button>
        )}

        {currentAccount && (
          <>
            <div className="mb-3">
              <Button
                color="primary"
                onClick={getAllWaves}
                disabled={isLoadingWaves}
              >
                Get All Waves&nbsp;
                {isLoadingWaves && <Spinner size="sm" type="grow" />}
              </Button>
            </div>
            <Row>
              <Col md={10}>
                <input
                  className="form-control"
                  placeholder="write your wave..."
                  value={message}
                  onChange={({ target: { value } }) => setMessage(value)}
                />
              </Col>
              <Col md={2}>
                <Button
                  color="primary"
                  onClick={handleSubmitWave}
                  disabled={isMining}
                  // style={{ marginLeft: "5px" }}
                >
                  Wave at Me&nbsp;
                  {isMining && <Spinner size="sm" type="grow" />}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
      {waves?.length > 0 &&
        waves?.map((wave, index) => (
          <Card key={index} className="mt-5">
            <CardHeader>Wallet Address: {wave.address}</CardHeader>
            <CardBody>{wave.message}</CardBody>
            <CardFooter>{wave.timestamp}</CardFooter>
          </Card>
        ))}
    </Container>
  );
}

export default App;
