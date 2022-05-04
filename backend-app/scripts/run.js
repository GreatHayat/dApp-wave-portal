const hre = require("hardhat");

const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const WaveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await WaveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  const contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );

  console.log(
    "Contract Balance",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("Hello from the solidity!");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract
    .connect(randomPerson)
    .wave("Hello from Blockchain!");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  const allWaves = await waveContract.getAllWaves();
  console.log("Total Waves", allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
