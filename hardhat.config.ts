import dotenv from "dotenv";

import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ledger";
import "@nomiclabs/hardhat-solhint";
import "@openzeppelin/hardhat-upgrades";

// Load .env file
dotenv.config();

// Check .env file variables
if (!process.env.ALCHEMY_API_KEY) {
  console.log("Missing ALCHEMY_API_KEY, non-local operations might fail");
}
if (!process.env.SEPOLIA_PRIVATE_KEY) {
  console.log("Missing SEPOLIA_PRIVATE_KEY, non-local operations might fail");
}
if (!process.env.ETHERSCAN_API_KEY) {
  console.log("Missing ETHERSCAN_API_KEY, non-local operations might fail");
}

// Hardhat Config
const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [
        process.env.SEPOLIA_PRIVATE_KEY ??
          "0000000000000000000000000000000000000000000000000000000000000000",
      ],
      gasPrice: "auto",
    },
    hardhat: {
      ledgerAccounts: [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
