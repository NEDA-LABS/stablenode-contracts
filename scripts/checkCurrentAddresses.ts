import { ethers } from "ethers";
import { getContracts } from "./utils";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  // Get contract instances
  const { gatewayInstance } = await getContracts();

  // Read the aggregator address from storage slot 153 (from the .openzeppelin file)
  const provider = gatewayInstance.provider;
  const contractAddress = gatewayInstance.address;
  
  // Slot 153 contains _aggregatorAddress
  const aggregatorSlot = ethers.utils.hexZeroPad(ethers.utils.hexlify(153), 32);
  const aggregatorData = await provider.getStorageAt(contractAddress, aggregatorSlot);
  const currentAggregator = ethers.utils.getAddress("0x" + aggregatorData.slice(-40));
  
  // Slot 152 contains treasuryAddress (offset 8) and protocolFeePercent (offset 0)
  const treasurySlot = ethers.utils.hexZeroPad(ethers.utils.hexlify(152), 32);
  const treasuryData = await provider.getStorageAt(contractAddress, treasurySlot);
  const currentTreasury = ethers.utils.getAddress("0x" + treasuryData.slice(-40));
  
  console.log("\n=== Current Contract Addresses ===");
  console.log(`Contract: ${contractAddress}`);
  console.log(`Current Aggregator: ${currentAggregator}`);
  console.log(`Current Treasury: ${currentTreasury}`);
  console.log("\n=== .env File Addresses ===");
  console.log(`New Aggregator: ${process.env.AGGREGATOR_ADDRESS}`);
  console.log(`New Treasury: ${process.env.TREASURY_ADDRESS}`);
  console.log("\n=== Comparison ===");
  console.log(`Aggregator needs update: ${currentAggregator.toLowerCase() !== process.env.AGGREGATOR_ADDRESS?.toLowerCase()}`);
  console.log(`Treasury needs update: ${currentTreasury.toLowerCase() !== process.env.TREASURY_ADDRESS?.toLowerCase()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
