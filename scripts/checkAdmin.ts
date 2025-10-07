import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const adminAddress = "0x7f18A3719Ad0CD59C48A8dBC0C57Dd7eCa07A0Dd";
  
  console.log("🔍 CHECKING ADMIN OWNERSHIP");
  console.log("=".repeat(50));
  console.log(`Your Address: ${deployer.address}`);
  console.log(`Admin Address: ${adminAddress}`);
  
  // Check admin ownership
  const adminABI = ["function owner() view returns (address)"];
  const adminContract = new ethers.Contract(adminAddress, adminABI, deployer);
  
  try {
    const adminOwner = await adminContract.owner();
    console.log(`Admin Owner: ${adminOwner}`);
    console.log(`You Own Admin: ${adminOwner.toLowerCase() === deployer.address.toLowerCase() ? "✅ YES" : "❌ NO"}`);
    
    if (adminOwner.toLowerCase() === deployer.address.toLowerCase()) {
      console.log("\n✅ SECURE: You control the admin contract!");
      console.log("This means you can upgrade your proxy anytime.");
    } else {
      console.log("\n❌ INSECURE: Someone else controls the admin!");
    }
  } catch (error) {
    console.log("❌ Could not check admin ownership:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
