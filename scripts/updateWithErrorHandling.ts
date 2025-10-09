import { ethers } from "ethers";
import { assertEnvironment, getContracts } from "./utils";
import dotenv from "dotenv";

dotenv.config();

assertEnvironment();

async function main() {
  // Get contract instances
  const { gatewayInstance, wallet } = await getContracts();
  const contractWithSigner = gatewayInstance.connect(wallet);

  const treasury = ethers.utils.formatBytes32String("treasury");
  const aggregator = ethers.utils.formatBytes32String("aggregator");

  console.log("\n=== Updating Protocol Addresses ===");
  console.log(`Treasury Address: ${process.env.TREASURY_ADDRESS}`);
  console.log(`Aggregator Address: ${process.env.AGGREGATOR_ADDRESS}`);
  console.log(`Wallet: ${wallet.address}`);
  console.log(`Contract: ${gatewayInstance.address}\n`);

  try {
    // Try to update treasury address
    console.log("Attempting to update treasury address...");
    const tx1 = await contractWithSigner.updateProtocolAddress(
      treasury,
      process.env.TREASURY_ADDRESS,
      { gasLimit: 200000 }
    );
    await tx1.wait();
    console.log(`✅ Updated treasury address: ${tx1.hash}`);
  } catch (error: any) {
    console.error(`❌ Failed to update treasury address:`);
    if (error.reason) console.error(`   Reason: ${error.reason}`);
    if (error.message) console.error(`   Message: ${error.message}`);
  }

  try {
    // Try to update aggregator address
    console.log("\nAttempting to update aggregator address...");
    const tx2 = await contractWithSigner.updateProtocolAddress(
      aggregator,
      process.env.AGGREGATOR_ADDRESS,
      { gasLimit: 200000 }
    );
    await tx2.wait();
    console.log(`✅ Updated aggregator address: ${tx2.hash}`);
  } catch (error: any) {
    console.error(`❌ Failed to update aggregator address:`);
    if (error.reason) console.error(`   Reason: ${error.reason}`);
    if (error.message) console.error(`   Message: ${error.message}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
