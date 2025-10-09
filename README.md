<a href="https://solidity.readthedocs.io/en/v0.8.20/"><img alt="solidity v0.8.20" src="https://badgen.net/badge/solidity/v0.8.20/blue"></a>

# NEDAPay Stablenode Contracts

    
## Description

NEDAPay Stablenode contracts are multi-chain EVM-based smart contracts that facilitate the on-chain lifecycle of payment orders. They empower senders to create payment orders, enable liquidity providers to receive cryptocurrency in escrow, and provide a secure, transparent payment infrastructure for cross-border transactions.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXd9vDhbrwj3ikJ9ghsVPc4qaZ7_RmgzNn3CjbW2jvAWepYYBmIat8Mtidid8OCBzuP7Sr-_zab6gjjpM6tSJm3p00akfR9xhkkzckDoZOhO9jiqgnO0EkZRyH4QoxgGAXRelCSNxQ?key=xfQ-CdRhtjGdAX7gL41tK8t-)

## Deployment

Deployment is done using Hardhat scripts

#### Deploy and verify upgradeable proxy contract

```bash
# Deploy with secure ownership
npx hardhat run scripts/deploySecure.ts --network <network>

# Verify implementation contract
npx hardhat verify --network <network> <implementation_address>
```

#### Upgrade proxy contract

```bash
npx hardhat run scripts/upgrade.ts --network <network>

# upgrade across all EVM chains
npx hardhat run scripts/upgrade.ts --network arbitrumOne && npx hardhat run scripts/upgrade.ts --network base && npx hardhat run scripts/upgrade.ts --network bsc && npx hardhat run scripts/upgrade.ts --network polygon && npx hardhat run scripts/upgrade.ts --network optimisticEthereum && npx hardhat run scripts/upgrade.ts --network scroll

# upgrade across all EVM testnet chains
npx hardhat run scripts/upgrade.ts --network arbitrumSepolia && npx hardhat run scripts/upgrade.ts --network amoy && npx hardhat run scripts/upgrade.ts --network baseSepolia && npx hardhat run scripts/upgrade.ts --network sepolia
```

#### Owner configurations

Update network settings in `scripts/config.ts`

```bash
npx hardhat run scripts/setSupportedTokens.ts --network <network>

npx hardhat run scripts/updateProtocolAddresses.ts --network <network>

npx hardhat run scripts/updateProtocolFee.ts --network <network>
```


## Testnet Contracts

<table>
	<thead>
		<tr>
			<th>Network</th>
			<th>Contracts</th>
			<th>Address</th>
			<th>Explorer</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="3">Base Sepolia</td>
			<td>Gateway Proxy</td>
			<td><code>0x327698AB6321de487F0321a2C5CA9Bec3d2bB47E</code></td>
			<td><a href="https://sepolia.basescan.org/address/0x327698AB6321de487F0321a2C5CA9Bec3d2bB47E">View</a></td>
		</tr>
		<tr>
			<td>Gateway Implementation</td>
			<td><code>0x2135439098B4a1880181f22cf9d4b25b8967f7B2</code></td>
			<td><a href="https://sepolia.basescan.org/address/0x2135439098B4a1880181f22cf9d4b25b8967f7B2#code">View</a></td>
		</tr>
		<tr>
			<td>Gateway Admin</td>
			<td><code>0x7f18A3719Ad0CD59C48A8dBC0C57Dd7eCa07A0Dd</code></td>
			<td><a href="https://sepolia.basescan.org/address/0x7f18A3719Ad0CD59C48A8dBC0C57Dd7eCa07A0Dd">View</a></td>
		</tr>
	</tbody>
</table>

## Mainnet Contracts

<table>
	<thead>
		<tr>
			<th>Network</th>
			<th>Contracts</th>
			<th>Address</th>
			<th>Explorer</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="3">Base</td>
			<td>Gateway Proxy</td>
			<td><code>0x40D8161F6E9D1A6385C90008082cBc97f5C7D098</code></td>
			<td><a href="https://basescan.org/address/0x40D8161F6E9D1A6385C90008082cBc97f5C7D098">View</a></td>
		</tr>
		<tr>
			<td>Gateway Implementation</td>
			<td><code>0x186E2D89099Ef4D3a2C670aB50B5B851d0c57ce8</code></td>
			<td><a href="https://basescan.org/address/0x186E2D89099Ef4D3a2C670aB50B5B851d0c57ce8#code">View</a></td>
		</tr>
		<tr>
			<td>Gateway Admin</td>
			<td><code>0xEf2B9dbdBb0195e235f9DEfAce126188d692714c</code></td>
			<td><a href="https://basescan.org/address/0xEf2B9dbdBb0195e235f9DEfAce126188d692714c">View</a></td>
		</tr>
	</tbody>
</table>

## Testing

Contract tests are defined under the tests directory. To run all the tests, run:

```bash
npx hardhat test
```



Our team will review your pull request and work with you to get it merged into the main branch of the repository.

If you encounter any issues or have questions, feel free to open an issue on the repository.


## Contributors ✨

Contributions of any kind are welcome!

## License
[Affero General Public License v3.0](https://choosealicense.com/licenses/agpl-3.0/)
