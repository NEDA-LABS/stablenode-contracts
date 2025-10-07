import { ethers, upgrades, network } from "hardhat";
import { confirmContinue, assertEnvironment, waitForInput, updateConfigFile } from "./utils";

assertEnvironment();

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("\n🔒 SECURE DEPLOYMENT - FRESH START");
  console.log("=".repeat(60));
  console.log(`Deployer Address: ${deployer.address}`);
  console.log(`Network: ${network.name}`);
  console.log(`Chain ID: ${network.config.chainId}`);
  
  await confirmContinue({
    contract: "Gateway",
    network: network.name,
    chainId: network.config.chainId,
  });
  
  console.log("\n📦 Deploying Gateway with YOU as admin...");
  console.log(`Balance: ${ethers.utils.formatEther(await deployer.getBalance())} ETH\n`);
  
  // Deploy with explicit admin control
  const Gateway = await ethers.getContractFactory("Gateway");
  
  // Deploy proxy with you as the admin
  const gateway = await upgrades.deployProxy(Gateway, [], {
    initializer: "initialize",
    kind: "transparent"
  });
  
  await gateway.deployed();
  
  const tx = await gateway.deployTransaction.wait();
  
  console.log("\n✅ DEPLOYMENT SUCCESSFUL!");
  console.log("=".repeat(60));
  console.log(`Transaction Hash: ${tx.transactionHash}`);
  console.log(`Proxy Address: ${gateway.address}`);
  console.log(`Deployer (You): ${deployer.address}`);
  
  // Get the admin address
  const adminAddress = await upgrades.erc1967.getAdminAddress(gateway.address);
  console.log(`Admin Address: ${adminAddress}`);
  
  // Verify admin ownership
  const adminABI = ["function owner() view returns (address)"];
  const adminContract = new ethers.Contract(adminAddress, adminABI, deployer);
  const adminOwner = await adminContract.owner();
  
  console.log(`Admin Owner: ${adminOwner}`);
  console.log(`You Control Admin: ${adminOwner.toLowerCase() === deployer.address.toLowerCase() ? "✅ YES" : "❌ NO"}`);
  
  // Get implementation address
  const implAddress = await upgrades.erc1967.getImplementationAddress(gateway.address);
  console.log(`Implementation: ${implAddress}`);
  
  // Verify proxy ownership
  const proxyOwner = await gateway.owner();
  console.log(`Proxy Owner: ${proxyOwner}`);
  console.log(`You Control Proxy: ${proxyOwner.toLowerCase() === deployer.address.toLowerCase() ? "✅ YES" : "❌ NO"}`);
  
  console.log("\n🔐 SECURITY STATUS:");
  if (adminOwner.toLowerCase() === deployer.address.toLowerCase() && 
      proxyOwner.toLowerCase() === deployer.address.toLowerCase()) {
    console.log("✅ SECURE - You have full control!");
  } else {
    console.log("❌ INSECURE - You do not have full control!");
  }
  
  // Update config file
  if (network.config.chainId !== undefined) {
    await updateConfigFile(network.config.chainId, gateway.address, implAddress);
  }
  
  console.log("\n🎯 NEXT STEPS:");
  console.log("1. Get Etherscan API key from https://etherscan.io/apis");
  console.log("2. Add ETHERSCAN_API_KEY to your .env file");
  console.log("3. Verify the implementation contract");
  console.log("4. Test the proxy functionality");
  console.log(`\n📋 DEPLOYMENT SUMMARY:`);
  console.log(`Proxy: ${gateway.address}`);
  console.log(`Implementation: ${implAddress}`);
  console.log(`Admin: ${adminAddress}`);
  console.log(`Owner: ${proxyOwner}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
