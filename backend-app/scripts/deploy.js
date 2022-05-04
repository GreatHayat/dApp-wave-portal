const hre = require("hardhat");

const run = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account Balance:", accountBalance.toString());

  const WaveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await WaveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });

  await waveContract.deployed();

  console.log("WavePortal Address:", waveContract.address);
};

run();
