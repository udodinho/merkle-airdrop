# Merkle Airdrop contract

This project is a smart contract that implements a Merkle Airdrop using Solidity, where users can claim an airdrop of ERC20 tokens by verifying their eligibility with a Merkle proof.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: You should have Node.js installed. [Download Node.js](https://nodejs.org)
- Hardhat: Hardhat is a development environment for Ethereum. Install it using npm [Hardhat](https://hardhat.org).

### Installation

Clone the repo and install dependencies

```shell
git clone https://github.com/udodinho/merkle-airdrop.git
cd merkle-airdrop
```

```shell
$ npm install
```

### Generate a Merkle root/tree
To generate a Merkle root from a CSV file of addresses and amounts, use the merkle.ts script

```shell
CSV_FILE_PATH=./file/addresses.csv npx hardhat run script/merkle.ts
```
### your merkle root and merkle tree will display on the console

### Deploying the MerkleAirdrop Contract

The CSV file is found in the file folder

- Deploy the UdvToken contract
```shell
npx hardhat ignition deploy ./ignition/modules/UdvToken.ts --network lisk-sepolia --verify
```
or use any network of your choice, just replace lisk-sepolia with yours

Use the address of the deployed token in the deploy script for Airdrop found in /ignition/modules/Airdrop.ts

- Deploy the MerkleAirdrop contract
```shell
npx hardhat ignition deploy ./ignition/modules/Airdrop.ts --network lisk-sepolia --verify
```

### Setup environment

```shell
LISK_RPC_URL=https://rpc.sepolia-api.lisk.com/
PRIVATE_KEY=your_private_key_here
```
