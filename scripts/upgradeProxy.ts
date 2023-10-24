import { ethers, run, upgrades } from "hardhat";
// import openzeppelin functions

async function main() {
  const proxyAddress = "0xA50a0B38944Db3dBd7182C3757E8cc13C5Ee1343";

  const WNMC = await ethers.getContractFactory("WrappedNamecoin");

  const wnmcDeploy = await upgrades.upgradeProxy(proxyAddress, WNMC, {
    kind: "uups",
  });
  await wnmcDeploy.waitForDeployment();

  const address = await wnmcDeploy.getAddress();

  // Display Proxy address
  console.log(`Contract deployed to ${address}`);

  // verify contract on etherscan
  verifyContracts(address);
}

async function verifyContracts(address: String) {
  const network = await ethers.provider.getNetwork();
  if (network.name !== "hardhat") {
    // Wait for 30 seconds for etherscan to index the contract
    await new Promise((resolve) => setTimeout(resolve, 30000));

    // verify contracts on etherscan
    console.log(`Verifying contracts`);

    // verify implementation contract on etherscan
    await run("verify:verify", {
      address,
      constructorArguments: [],
    });
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
