import "hardhat-deploy";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-network-helpers";
import "@nomicfoundation/hardhat-verify";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { task, types } from "hardhat/config";
import "dotenv/config";

const config = {
	namedAccounts: {
		deployer: {
			default: 0,
		},
	},
	solidity: {
		version: "0.8.20",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
			viaIR: true,
		},
	},
	networks: {
		// Mainnets
		arbitrumOne: {
			url: "https://arb1.arbitrum.io/rpc",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 42161,
			saveDeployments: true,
		},
		base: {
			url: "https://mainnet.base.org",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 8453,
			saveDeployments: true,
		},
		bsc: {
			url: "https://bsc-dataseed1.binance.org",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 56,
			saveDeployments: true,
		},
		polygon: {
			url: "https://polygon-rpc.com",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 137,
			saveDeployments: true,
		},
		mainnet: {
			url: "https://eth.llamarpc.com",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 1,
			saveDeployments: true,
		},
		optimisticEthereum: {
			url: "https://mainnet.optimism.io",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 10,
			saveDeployments: true,
		},
		scroll: {
			url: "https://scroll.drpc.org",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 534352,
			saveDeployments: true,
		},
		celo: {
			url: "https://forno.celo.org",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 42220,
			saveDeployments: true,
		},
		assetChain: {
			url: "https://mainnet-rpc.assetchain.org",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 42420,
			saveDeployments: true,
		},
		lisk: {
			url: "https://rpc.api.lisk.com",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 1135,
			saveDeployments: true,
		},

		// Testnets
		arbitrumSepolia: {
			url: "https://sepolia-rollup.arbitrum.io/rpc",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 421614,
			saveDeployments: true,
		},
		amoy: {
			url: "https://rpc-amoy.polygon.technology",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 80002,
			saveDeployments: true,
		},
		baseSepolia: {
			url: "https://sepolia.base.org",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 84532,
			saveDeployments: true,
		},
		sepolia: {
			url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 11155111,
			saveDeployments: true,
		},
		assetchainTestnet: {
			url: "https://enugu-rpc.assetchain.org/",
			accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
			chainId: 42421,
			saveDeployments: true,
		},
	},
	sourcify: {
		enabled: false
	},
	etherscan: {
		enabled: true,
		apiKey: process.env.ETHERSCAN_API_KEY || "",
	},
};

task("flat", "Flattens and prints contracts and their dependencies (Resolves licenses)")
  .addOptionalVariadicPositionalParam("files", "The files to flatten", undefined, types.inputFile)
  .setAction(async ({ files }, hre) => {
    let flattened = await hre.run("flatten:get-flattened-sources", { files });
    
    // Remove every line started with "// SPDX-License-Identifier:"
    flattened = flattened.replace(/SPDX-License-Identifier:/gm, "License-Identifier:");
    flattened = `// SPDX-License-Identifier: MIXED\n\n${flattened}`;

    // Remove every line started with "pragma experimental ABIEncoderV2;" except the first one
    flattened = flattened.replace(/pragma experimental ABIEncoderV2;\n/gm, ((i) => (m: any) => (!i++ ? m : ""))(0));
    console.log(flattened);
  });

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  const provider = hre.ethers.provider;

  for (const account of accounts) {
      console.log(
          "%s (%i ETH)",
          account.address,
          // hre.ethers.utils.formatEther(
              // getBalance returns wei amount, format to ETH amount
              await provider.getBalance(account.address)
          // )
      );
  }
});

export default config;
