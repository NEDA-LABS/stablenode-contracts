# Paycrest Contracts Analysis & Redeployment Guide

## Project Overview

**Paycrest** is a sophisticated multi-chain EVM-based smart contract system designed for cross-border payments using blockchain technology and peer-to-peer off-ramps. The system facilitates the on-chain lifecycle of payment orders, enabling senders to create orders and liquidity providers to receive cryptocurrency in escrow.

## Smart Contract Architecture

### Core Contracts

#### 1. **Gateway.sol** - Main Payment Gateway Contract
- **Purpose**: Primary contract handling the complete order lifecycle
- **Key Functions**:
  - `createOrder()` - Locks sender's tokens and creates payment orders
  - `settle()` - Distributes funds to liquidity providers when orders are fulfilled
  - `refund()` - Returns funds to sender if order cannot be completed
  - `pause()/unpause()` - Emergency controls for contract owner
- **Features**:
  - Upgradeable proxy pattern using OpenZeppelin
  - Pausable functionality for emergency stops
  - Nonce-based replay attack protection
  - Protocol fee collection mechanism

#### 2. **GatewaySettingManager.sol** - Configuration Management
- **Purpose**: Manages protocol settings and configurations
- **Key Functions**:
  - `settingManagerBool()` - Manages supported tokens
  - `updateProtocolFee()` - Updates protocol fee percentage
  - `updateProtocolAddress()` - Updates treasury and aggregator addresses
- **Features**:
  - Owner-only access controls
  - Event emission for all configuration changes
  - Support for treasury and aggregator address management

#### 3. **IGateway.sol** - Interface Definition
- **Purpose**: Defines the contract interface and data structures
- **Key Structures**:
  - `Order` struct containing all order details
  - Event definitions for order lifecycle
  - Function signatures for external interactions

### Order Lifecycle

1. **Order Creation**: User calls `createOrder()` with token, amount, rate, and recipient details
2. **Token Lock**: Contract locks user's tokens in escrow
3. **Settlement**: Aggregator calls `settle()` to distribute funds to liquidity provider
4. **Fee Distribution**: Protocol fees sent to treasury, sender fees to designated recipient
5. **Completion**: Order marked as fulfilled or refunded

## Multi-Chain Deployment

The system is deployed across **10+ EVM blockchain networks**:

### Mainnets
- **Ethereum** (Chain ID: 1)
- **Polygon** (Chain ID: 137) 
- **Base** (Chain ID: 8453)
- **BNB Smart Chain** (Chain ID: 56)
- **Arbitrum One** (Chain ID: 42161)
- **Optimism** (Chain ID: 10)
- **Scroll** (Chain ID: 534352)
- **Celo** (Chain ID: 42220)
- **Lisk** (Chain ID: 1135)
- **AssetChain** (Chain ID: 42420)

### Testnets
- Ethereum Sepolia, Polygon Amoy, Base Sepolia, Arbitrum Sepolia, AssetChain Testnet

## Deployment Steps & Requirements

### Prerequisites

1. **Environment Setup**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Environment Variables** (create `.env` from `.env.example`):
   ```env
   DEPLOYER_PRIVATE_KEY=your_private_key
   SHIELD3_API_KEY=your_shield3_api_key
   ETHERSCAN_API_KEY=your_etherscan_key
   POLYGONSCAN_API_KEY=your_polygonscan_key
   BASESCAN_API_KEY=your_basescan_key
   ARBISCAN_API_KEY=your_arbiscan_key
   BSCSCAN_API_KEY=your_bscscan_key
   TREASURY_ADDRESS=your_treasury_address
   AGGREGATOR_ADDRESS=your_aggregator_address
   ```

### Deployment Process

#### 1. **Deploy New Gateway Contract**
```bash
# Deploy upgradeable proxy contract
npx hardhat run scripts/deploy.ts --network <network>

# Verify contract on block explorer
npx hardhat verify --network <network> <contract_address>
```

#### 2. **Configure Contract Settings**
```bash
# Set supported tokens
npx hardhat run scripts/setSupportedTokens.ts --network <network>

# Update protocol addresses (treasury & aggregator)
npx hardhat run scripts/updateProtocolAddresses.ts --network <network>

# Set protocol fee
npx hardhat run scripts/updateProtocolFee.ts --network <network>
```

#### 3. **Upgrade Existing Contracts** (if needed)
```bash
# Single network upgrade
npx hardhat run scripts/upgrade.ts --network <network>

# Bulk mainnet upgrade
npx hardhat run scripts/upgrade.ts --network arbitrumOne && \
npx hardhat run scripts/upgrade.ts --network base && \
npx hardhat run scripts/upgrade.ts --network bsc && \
npx hardhat run scripts/upgrade.ts --network polygon && \
npx hardhat run scripts/upgrade.ts --network optimisticEthereum && \
npx hardhat run scripts/upgrade.ts --network scroll
```

### Network Configuration

Each network requires specific configuration in `scripts/config.ts`:
- **RPC URLs** (using Shield3 for security)
- **Supported Tokens** (USDC, USDT, cNGN, etc.)
- **Protocol Fee** (typically 500 BPS = 0.5%)
- **Contract Addresses**

## Rebranding Plan - Removing Paycrest References

### Files Requiring Updates

#### 1. **Primary Documentation**
- **`README.md`** - Update title, description, links, and contributor information
- **`package.json`** - Change name, description, repository URL, and author

#### 2. **Configuration Files**
- **`hardhat.config.ts`** - Update etherscan API key references (lines 166-167)
- **`.github/ISSUE_TEMPLATE/config.yaml`** - Update support links
- **`.github/PULL_REQUEST_TEMPLATE.md`** - Update contribution guidelines

#### 3. **Build Artifacts** (Auto-regenerated)
- Files in `build/contracts/` will be regenerated during compilation
- No manual changes needed

### Rebranding Checklist

- [ ] Update project name in `package.json`
- [ ] Replace repository URL with your fork
- [ ] Update README.md with your branding
- [ ] Change author information
- [ ] Update GitHub templates and issue configs
- [ ] Replace Paycrest links with your documentation
- [ ] Update contributor acknowledgments
- [ ] Regenerate build artifacts with `npm run compile`

### Recommended New Structure

1. **Choose Your Brand Name** (e.g., "YourPayments", "CrossChainGateway")
2. **Update Repository References** to point to your GitHub
3. **Create New Documentation** reflecting your use case
4. **Set Up Your Own**:
   - Treasury addresses
   - Aggregator addresses  
   - API keys and endpoints
   - Support channels

## Testing

```bash
# Run all tests
npm test

# Run specific test suites
npm run ownership
npm run settleOrder  
npm run createOrder
```

## Security Considerations

- **Upgradeable Contracts**: Use OpenZeppelin's upgrade patterns
- **Access Controls**: Owner-only functions for critical operations
- **Pausable**: Emergency stop functionality
- **Reentrancy Protection**: Built into OpenZeppelin contracts
- **Input Validation**: Comprehensive checks on all user inputs

## Contract Functions Deep Dive

### Gateway.sol Key Functions

#### `createOrder()`
```solidity
function createOrder(
    address _token,
    uint256 _amount,
    uint96 _rate,
    address _senderFeeRecipient,
    uint256 _senderFee,
    address _refundAddress,
    string calldata messageHash
) external returns (bytes32 orderId)
```
- Validates token support and amount
- Transfers tokens to contract
- Generates unique order ID using nonce and chain ID
- Emits `OrderCreated` event

#### `settle()`
```solidity
function settle(
    bytes32 _splitOrderId,
    bytes32 _orderId,
    address _liquidityProvider,
    uint64 _settlePercent
) external onlyAggregator returns (bool)
```
- Only callable by aggregator
- Distributes funds to liquidity provider
- Deducts protocol fees
- Handles partial settlements
- Emits `OrderSettled` event

#### `refund()`
```solidity
function refund(
    uint256 _fee,
    bytes32 _orderId
) external onlyAggregator returns (bool)
```
- Only callable by aggregator
- Returns funds to refund address
- Deducts refund fee
- Emits `OrderRefunded` event

### GatewaySettingManager.sol Key Functions

#### `settingManagerBool()`
```solidity
function settingManagerBool(
    bytes32 what,
    address value,
    uint256 status
) external onlyOwner
```
- Manages supported tokens (status: 1=supported, 2=unsupported)
- Only owner can modify
- Emits `SettingManagerBool` event

#### `updateProtocolFee()`
```solidity
function updateProtocolFee(uint64 _protocolFeePercent) external onlyOwner
```
- Updates protocol fee percentage (in basis points)
- Emits `ProtocolFeeUpdated` event

#### `updateProtocolAddress()`
```solidity
function updateProtocolAddress(
    bytes32 what,
    address value
) external onlyOwner
```
- Updates treasury or aggregator addresses
- Prevents setting same address twice
- Emits `ProtocolAddressUpdated` event

## Events Reference

### Order Lifecycle Events
```solidity
event OrderCreated(
    address indexed sender,
    address indexed token,
    uint256 indexed amount,
    uint256 protocolFee,
    bytes32 orderId,
    uint256 rate,
    string messageHash
);

event OrderSettled(
    bytes32 splitOrderId,
    bytes32 indexed orderId,
    address indexed liquidityProvider,
    uint96 settlePercent
);

event OrderRefunded(
    uint256 fee,
    bytes32 indexed orderId
);
```

### Configuration Events
```solidity
event SettingManagerBool(
    bytes32 indexed what,
    address indexed value,
    uint256 status
);

event ProtocolFeeUpdated(uint64 protocolFee);

event ProtocolAddressUpdated(
    bytes32 indexed what,
    address indexed treasuryAddress
);
```

## Error Handling

### Common Errors
- `OnlyAggregator` - Function restricted to aggregator address
- `TokenNotSupported` - Token not in supported list
- `AmountIsZero` - Cannot create order with zero amount
- `ThrowZeroAddress` - Invalid zero address provided
- `OrderFulfilled` - Order already completed
- `OrderRefunded` - Order already refunded
- `FeeExceedsProtocolFee` - Refund fee too high
- `InvalidMessageHash` - Empty message hash provided
- `OrderAlreadyExists` - Order ID collision

## Gas Optimization

### Efficient Patterns Used
- **Packed Structs**: Using appropriate data types (uint64, uint96)
- **Storage Gaps**: Reserved slots for future upgrades
- **Batch Operations**: Single transaction for multiple settlements
- **Event Indexing**: Optimized for query performance

## Upgrade Strategy

### OpenZeppelin Upgrades
- **Proxy Pattern**: Separates logic from storage
- **Storage Layout**: Maintains compatibility across versions
- **Initialization**: Uses `initialize()` instead of constructor
- **Gap Reservations**: Prevents storage collisions

### Upgrade Process
1. Deploy new implementation contract
2. Call upgrade function through proxy
3. Verify upgrade success
4. Update configuration if needed

## Integration Guide

### For Frontend Applications
```javascript
// Connect to Gateway contract
const gateway = new ethers.Contract(
    GATEWAY_ADDRESS,
    GATEWAY_ABI,
    signer
);

// Create order
const tx = await gateway.createOrder(
    tokenAddress,
    amount,
    rate,
    feeRecipient,
    senderFee,
    refundAddress,
    messageHash
);

// Listen for events
gateway.on("OrderCreated", (sender, token, amount, fee, orderId, rate, hash) => {
    console.log("Order created:", orderId);
});
```

### For Backend Services
```javascript
// Settle order (aggregator only)
const settleTx = await gateway.settle(
    splitOrderId,
    orderId,
    liquidityProvider,
    settlePercent
);

// Refund order (aggregator only)
const refundTx = await gateway.refund(
    fee,
    orderId
);
```

## Monitoring & Analytics

### Key Metrics to Track
- **Order Volume**: Total value processed
- **Settlement Rate**: Percentage of successful orders
- **Average Settlement Time**: Time from creation to settlement
- **Protocol Fees Collected**: Revenue tracking
- **Token Distribution**: Most used tokens per network

### Event Monitoring
Set up event listeners for:
- Order creation patterns
- Settlement success rates
- Refund frequencies
- Fee collection amounts

## Troubleshooting

### Common Issues
1. **Transaction Reverts**: Check token approvals and balances
2. **Gas Estimation Failures**: Verify contract state and parameters
3. **Event Not Emitted**: Confirm transaction success and block confirmation
4. **Upgrade Failures**: Validate storage layout compatibility

### Debug Commands
```bash
# Check contract state
npx hardhat console --network <network>

# Verify deployment
npx hardhat verify --network <network> <address>

# Run specific tests
npx hardhat test test/gateway/gateway.createorder.test.js
```

## Summary

This comprehensive guide provides everything needed to understand, deploy, and customize the Paycrest contracts system. The architecture is production-ready, battle-tested across multiple networks, and designed for scalability and security.

**Key Takeaways**:
- Multi-chain payment gateway with upgradeable architecture
- Comprehensive order lifecycle management
- Built-in security features and access controls
- Extensive configuration options for customization
- Ready for rebranding and independent deployment

Follow the deployment steps, complete the rebranding checklist, and you'll have your own cross-border payment solution running on multiple blockchain networks.
