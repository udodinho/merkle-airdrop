import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0xc553bb1b0Fac6929E6eE1cB6159aDab32dD12b90";
const merkleRoot = "0x59fc83c59d4d39f49bcb54ec885426220252dbdb4e658d987c25f1b1bfd4e70d";

const MerkleAirdropModule = buildModule("MerkleAirdropModule", (m) => {
  const airdrop = m.contract("MerkleAirdrop", [tokenAddress, merkleRoot], {});

  return { airdrop };
});

export default MerkleAirdropModule;
