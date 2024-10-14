import { ethers, run, upgrades } from "hardhat";

async function main() {
  const WNMC = await ethers.getContractFactory("WrappedNamecoin"); // Get the contract factory
  const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" }); // Deploy the contract as a proxy
  await wnmcDeploy.waitForDeployment(); // Wait for the deployment to be mined

  const address = await wnmcDeploy.getAddress();
  const implementationAddress =
    await upgrades.erc1967.getImplementationAddress(address);

  // Display Proxy address
  console.log(`Proxy Contract deployed to ${address}`);

  // Display implementation address
  console.log(`Implementation Contract deployed to ${implementationAddress}`);

  // verify contracts on etherscan
  await verifyContracts(address, implementationAddress);
}

async function verifyContracts(address: String, implementationAddress: String) {
  const network = await ethers.provider.getNetwork();
  if (network.name !== "hardhat") {
    // Wait for 30 seconds for etherscan to index the contract
    await new Promise((resolve) => setTimeout(resolve, 30000));

    // verify contracts on etherscan
    console.log(`Verifying contracts`);

    // verify implementation contract on etherscan
    await run("verify:verify", {
      address: implementationAddress,
      constructorArguments: [],
    });

    // Wait for 30 seconds for etherscan to verify the contract
    await new Promise((resolve) => setTimeout(resolve, 30000));

    // verify proxy contract on etherscan
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
