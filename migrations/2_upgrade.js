const { admin } = require('@openzeppelin/truffle-upgrades');
const ProxyAdmin = artifacts.require(
    '@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol/ProxyAdmin.json'
  );
const Gateway = artifacts.require("Gateway");

// Set your proxy contract address here
const proxyContractAddress = process.env.PROXY_CONTRACT_ADDRESS || ""; 

module.exports = async function (deployer) {
  try {
    if (!proxyContractAddress) {
      throw new Error("Please set PROXY_CONTRACT_ADDRESS environment variable");
    }

    // Deploy the new Gateway implementation contract
    await deployer.deploy(Gateway);

    // Upgrade proxy contract
    const adminIns = await admin.getInstance();
    const adminContract = await ProxyAdmin.at(adminIns.address);
    await adminContract.upgrade(proxyContractAddress, Gateway.address);
    console.info("✅ Upgraded Gateway: ", proxyContractAddress);
  } catch (error) {
    console.error("UUPS: upgrade contract error", error);
  }
};