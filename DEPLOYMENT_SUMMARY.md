# NEDAPay Stablenode - Deployment Summary

## Project Overview

**NEDAPay Stablenode** is a multi-chain EVM-based smart contract system for cross-border payments, originally created by [Paycrest](https://github.com/paycrest/contracts). We acknowledge and thank the Paycrest team for their pioneering work.

## Deployed Contracts

### Mainnet Deployments

#### Base Mainnet (Chain ID: 8453)
- **Gateway Proxy**: `0x40D8161F6E9D1A6385C90008082cBc97f5C7D098`
  - [View on Basescan](https://basescan.org/address/0x40D8161F6E9D1A6385C90008082cBc97f5C7D098)
- **Gateway Implementation**: `0x186E2D89099Ef4D3a2C670aB50B5B851d0c57ce8`
  - [View Verified Contract](https://basescan.org/address/0x186E2D89099Ef4D3a2C670aB50B5B851d0c57ce8#code)
- **Gateway Admin**: `0xEf2B9dbdBb0195e235f9DEfAce126188d692714c`
  - [View on Basescan](https://basescan.org/address/0xEf2B9dbdBb0195e235f9DEfAce126188d692714c)
- **Owner**: `0x18000433c7cc39ebdAbB06262F88795960FE5Cf9`
- **Status**: ✅ Deployed & Verified

### Testnet Deployments

#### Base Sepolia (Chain ID: 84532)
- **Gateway Proxy**: `0x327698AB6321de487F0321a2C5CA9Bec3d2bB47E`
  - [View on Basescan](https://sepolia.basescan.org/address/0x327698AB6321de487F0321a2C5CA9Bec3d2bB47E)
- **Gateway Implementation**: `0x2135439098B4a1880181f22cf9d4b25b8967f7B2`
  - [View Verified Contract](https://sepolia.basescan.org/address/0x2135439098B4a1880181f22cf9d4b25b8967f7B2#code)
- **Gateway Admin**: `0x7f18A3719Ad0CD59C48A8dBC0C57Dd7eCa07A0Dd`
  - [View on Basescan](https://sepolia.basescan.org/address/0x7f18A3719Ad0CD59C48A8dBC0C57Dd7eCa07A0Dd)
- **Owner**: `0x18000433c7cc39ebdAbB06262F88795960FE5Cf9`
- **Status**: ✅ Deployed & Verified

## Technical Details

### Smart Contract Architecture
- **Proxy Pattern**: Transparent Upgradeable Proxy (OpenZeppelin)
- **Solidity Version**: 0.8.20
- **Optimization**: Enabled (200 runs)
- **Compiler**: via IR enabled

### Security Features
- ✅ Upgradeable proxy pattern with admin control
- ✅ Owner has full control of admin contract
- ✅ Two-step ownership transfer (Ownable2Step)
- ✅ Pausable functionality for emergency stops
- ✅ Protocol fee management
- ✅ Supported token whitelist

### Verification
- ✅ All implementation contracts verified on block explorers
- ✅ Using Etherscan API V2 for verification
- ✅ Source code publicly available

## Configuration

### Environment Variables Required
```bash
DEPLOYER_PRIVATE_KEY=<your-private-key>
ETHERSCAN_API_KEY=<your-etherscan-api-key>
TREASURY_ADDRESS=<treasury-address>
AGGREGATOR_ADDRESS=<aggregator-address>
```

### Deployment Commands

#### Deploy to a Network
```bash
npx hardhat run scripts/deploySecure.ts --network <network>
```

#### Verify Contract
```bash
npx hardhat verify --network <network> <implementation-address>
```

#### Upgrade Contract
```bash
npx hardhat run scripts/upgrade.ts --network <network>
```

## Supported Networks

### Mainnets
- ✅ Base (8453)
- Ethereum (1)
- Polygon (137)
- BSC (56)
- Arbitrum One (42161)
- Optimism (10)
- Scroll (534352)
- Celo (42220)
- Lisk (1135)
- AssetChain (42420)

### Testnets
- ✅ Base Sepolia (84532)
- Ethereum Sepolia (11155111)
- Polygon Amoy (80002)
- Arbitrum Sepolia (421614)
- AssetChain Testnet (42421)

## Next Steps

1. **Configure Protocol Settings**
   - Set treasury address
   - Set aggregator address
   - Configure protocol fees
   - Add supported tokens

2. **Deploy to Additional Networks**
   - Use the same secure deployment process
   - Verify all implementations
   - Update configuration files

3. **Testing**
   - Run comprehensive test suite
   - Test order creation and settlement
   - Verify refund functionality
   - Test upgradability

## Resources

- **Repository**: https://github.com/NEDA-LABS/contracts
- **Original Project**: https://github.com/paycrest/contracts
- **Hardhat Documentation**: https://hardhat.org/docs
- **OpenZeppelin Upgrades**: https://docs.openzeppelin.com/upgrades-plugins/

## License

AGPL-3.0 - See [LICENSE](LICENSE) file for details

---

**Built by NEDA Labs** | Originally created by Paycrest
