import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const NETWORKS = {
	/////////////////////////////////
	// Mainnets
	/////////////////////////////////

	/**
	 * @dev Arbitrum One
	 */
	42161: {
		RPC_URL: "https://arb1.arbitrum.io/rpc",
		SUPPORTED_TOKENS: {
			USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
			USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev Base
	 */
	8453: {
		RPC_URL: "https://mainnet.base.org",
		SUPPORTED_TOKENS: {
			USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
			cNGN: "0x46C85152bFe9f96829aA94755D9f915F9B10EF5F",
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "0x40D8161F6E9D1A6385C90008082cBc97f5C7D098",
		GATEWAY_IMPLEMENTATION: "0x186E2D89099Ef4D3a2C670aB50B5B851d0c57ce8",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev Binance Smart Chain
	 */
	56: {
		RPC_URL: "https://bsc-dataseed1.binance.org",
		SUPPORTED_TOKENS: {
			USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
			USDT: "0x55d398326f99059ff775485246999027b3197955",
			cNGN: "0xa8AEA66B361a8d53e8865c62D142167Af28Af058"
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
	},

	/**
	 * @dev Polygon Mainnet
	 */
	137: {
		RPC_URL: "https://polygon-rpc.com",
		SUPPORTED_TOKENS: {
			USDC: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
			USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
			cNGN: "0x52828daa48C1a9A06F37500882b42daf0bE04C3B"
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev Ethereum Mainnet
	 */
	1: {
		RPC_URL: "https://eth.llamarpc.com",
		SUPPORTED_TOKENS: {
			USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
			USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev Optimism Mainnet
	 */
	10: {
		RPC_URL: "https://mainnet.optimism.io",
		SUPPORTED_TOKENS: {
			USDC: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
			USDT: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev Scroll Mainnet
	 */
	534352: {
		RPC_URL: "https://scroll.drpc.org",
		SUPPORTED_TOKENS: {
			USDC: "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4",
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev Celo Mainnet
	 */
	42220: {
		RPC_URL: "https://forno.celo.org",
		SUPPORTED_TOKENS: {
			USDC: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
			cUSD: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
			USDT: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev AssetChain Mainnet
	 */
	42420: {
		RPC_URL: "https://mainnet-rpc.assetchain.org",
		SUPPORTED_TOKENS: {
			USDC: "0x2B7C1342Cc64add10B2a79C8f9767d2667DE64B2",
			cNGN: "0x7923C0f6FA3d1BA6EAFCAedAaD93e737Fd22FC4F"
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev Lisk Mainnet
	 */
	1135: {
		RPC_URL: "https://rpc.api.lisk.com",
		SUPPORTED_TOKENS: {
			USDT: "0x05D032ac25d322df992303dCa074EE7392C117b9",
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},

	/////////////////////////////////
	// Testnets
	/////////////////////////////////

	/**
	 * @dev Polygon Amoy
	 */
	80002: {
		RPC_URL: "https://rpc-amoy.polygon.technology",
		SUPPORTED_TOKENS: {
			USDC: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582",
			cNGN: "0x1BE5EaCb5D503fe8D64c810a0b14cdD7eC48df1f"
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev Arbitrum Sepolia
	 */
	421614: {
		RPC_URL: "https://sepolia-rollup.arbitrum.io/rpc",
		SUPPORTED_TOKENS: {
			"6TEST": "0x3870419Ba2BBf0127060bCB37f69A1b1C090992B",
			USDC: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev Base Sepolia
	 */
	84532: {
		RPC_URL: "https://sepolia.base.org",
		SUPPORTED_TOKENS: {
			USDC: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
			DAI: "0x7683022d84f726a96c4a6611cd31dbf5409c0ac9",
			cNGN: "0x24FcDa8602a75e065c1cc6d765e7Ad3217b2827b",
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "0x327698AB6321de487F0321a2C5CA9Bec3d2bB47E",
		GATEWAY_IMPLEMENTATION: "0x2135439098B4a1880181f22cf9d4b25b8967f7B2",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev Ethereum Sepolia
	 */
	11155111: {
		RPC_URL: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
		SUPPORTED_TOKENS: {
			"6TEST": "0x3870419Ba2BBf0127060bCB37f69A1b1C090992B",
			DAI: "0x77Ab54631BfBAE40383c62044dC30B229c7df9f5",
			cNGN: "0x38528a3100E5e19b3043041FF9b00A983145Fb1A"
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},

	/**
	 * @dev AssetChain Testnet
	 */
	42421: {
		RPC_URL: "https://enugu-rpc.assetchain.org/",
		SUPPORTED_TOKENS: {
			USDC: "0x04f868C5b3F0A100a207c7e9312946cC2c48a7a3",
			cNGN: "0x069404d2F76Aa4519819a41B4E385074A9F4E8eA"
		},
		TREASURY_FEE_PERCENT: 500, // in BPS i.e 0.5%
		GATEWAY_CONTRACT: "",
		GATEWAY_IMPLEMENTATION: "",
		IMPERSONATE_ACCOUNT: "",
	},
};

export { NETWORKS };
