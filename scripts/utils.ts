import readline from "readline";
import dotenv from "dotenv";
import { artifacts, ethers, network } from "hardhat";
import { NETWORKS } from "./config";
import { promises as fs } from 'fs';
import * as path from 'path';

dotenv.config();

/**
 * Asserts that environment variables are set as expected
 */
export const assertEnvironment = () => {
  if (!process.env.DEPLOYER_PRIVATE_KEY) {
    console.error("Please set DEPLOYER_PRIVATE_KEY in a .env file");
    process.exit(1); // Kill the process if DEPLOYER_PRIVATE_KEY is not set
  }
  if (!process.env.TREASURY_ADDRESS) {
    console.error("Please set TREASURY_ADDRESS in a .env file");
    process.exit(1); // Kill the process if TREASURY_ADDRESS is not set
  }
  if (!process.env.AGGREGATOR_ADDRESS) {
    console.error("Please set AGGREGATOR_ADDRESS in a .env file");
    process.exit(1); // Kill the process if AGGREGATOR_ADDRESS is not set
  }
};


/**
 * Helper method for waiting on user input. Source: https://stackoverflow.com/a/50890409
 * @param query
 */
export async function waitForInput(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

/**
 * Helper method for confirming user input
 *
 * @param params
 */
export async function confirmContinue(params: any) {
  console.log("\nPARAMETERS");
  console.table(params);

  const response = await waitForInput("\nDo you want to continue? y/N\n");
  if (response !== "y")
    throw new Error("Aborting script: User chose to exit script");
  console.log("\n");
}


export async function updateConfigFile(chainId: number, proxyAddress: string, implementationAddress?: string): Promise<void> {
  try {
    const configFilePath = path.join(__dirname, 'config.ts');
    // Read the existing config file
    let configContent = await fs.readFile(configFilePath, 'utf-8');

    // Create a regex to match the network object for the specific chainId
    const networkRegex = new RegExp(`(${chainId}:\\s*{[\\s\\S]*?)(},?)`, 'g');

    if (networkRegex.test(configContent)) {
      configContent = configContent.replace(networkRegex, (match) => {
        const lines = match.split('\n');
        const updatedLines = lines.map(line => {
          if (line.trim().startsWith('GATEWAY_CONTRACT:')) {
            return line.replace(/GATEWAY_CONTRACT:.*/, `GATEWAY_CONTRACT: "${proxyAddress}",`);
          }
          if (implementationAddress && line.trim().startsWith('GATEWAY_IMPLEMENTATION:')) {
            return line.replace(/GATEWAY_IMPLEMENTATION:.*/, `GATEWAY_IMPLEMENTATION: "${implementationAddress}",`);
          }
          return line;
        });

        if (!updatedLines.some(line => line.trim().startsWith('GATEWAY_IMPLEMENTATION:'))) {
          // If IMPLEMENTATION doesn't exist, add it before the closing brace
          updatedLines.splice(-1, 0, `\t\GATEWAY_IMPLEMENTATION: "${implementationAddress}",`);
        }

        return updatedLines.join('\n');
      });
    } else {
      console.error(`Network configuration for chainId ${chainId} not found in config file.`);
      return;
    }

    // Write the updated content back to the file
    await fs.writeFile(configFilePath, configContent, 'utf-8');

    console.log(`Updated config.ts with chainId: ${chainId} and implementation address: ${implementationAddress}`);
  } catch (error) {
    console.error('Error updating config file:', error);
  }
}


/**
 * Retrieves the wallet and contract instances.
 * 
 * @returns An object containing the wallet and contract instances.
 */
export async function getContracts(): Promise<any> {
  assertEnvironment();

  const networkConfig = NETWORKS[network.config.chainId as keyof typeof NETWORKS];
  const Gateway = await artifacts.readArtifact("Gateway");
  
  // Get signer
  const provider = new ethers.providers.JsonRpcProvider(networkConfig.RPC_URL);
  const wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY!, provider);

  // Get contract instances
  const gatewayInstance = new ethers.Contract(
    networkConfig.GATEWAY_CONTRACT,
    Gateway.abi,
    provider
  );

  return {
		wallet,
		gatewayInstance,
	};
}