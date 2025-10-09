import { ethers } from "ethers";
import { getContracts } from "./utils";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  // Get contract instances
  const { gatewayInstance, wallet } = await getContracts();

  // Check owner
  const owner = await gatewayInstance.owner();
  const pendingOwner = await gatewayInstance.pendingOwner();
  
  console.log("\n=== Ownership Information ===");
  console.log(`Contract: ${gatewayInstance.address}`);
  console.log(`Current Owner: ${owner}`);
  console.log(`Pending Owner: ${pendingOwner}`);
  console.log(`Deployer Wallet: ${wallet.address}`);
  console.log(`Is Deployer the Owner: ${owner.toLowerCase() === wallet.address.toLowerCase()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
