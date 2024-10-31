import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre, { ethers } from "hardhat";

  describe("MerkleAirdrop", function () {
    // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployToken() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const erc20Token = await hre.ethers.getContractFactory("Web3CXI");
    const token = await erc20Token.deploy();

    return { token }
  };

  async function deployMerkleAirdrop() {
    const [owner, otherAccount, acct] = await hre.ethers.getSigners();

    const { token } = await loadFixture(deployToken);
    const merkleRoot = "0x59fc83c59d4d39f49bcb54ec885426220252dbdb4e658d987c25f1b1bfd4e70d";

    const merkleAirdrop = await hre.ethers.getContractFactory("MerkleAirdrop");
    const airdropAddress = await merkleAirdrop.deploy(token, merkleRoot);

    return { owner, otherAccount, acct, airdropAddress, token, merkleRoot}
  }

  describe("Deployment", function () {
    it("Should check if owner is correct", async function() {
        const { airdropAddress, owner } = await loadFixture(deployMerkleAirdrop);

        expect(await airdropAddress.owner()).to.equal(owner);
    });

    it("Should check if token address is correct", async function () {
        const { airdropAddress, token } = await loadFixture(deployMerkleAirdrop);

        expect(await airdropAddress.getAddress()).to.equal(token);
    });
  });

  describe("ClaimAirdrop", function() {
    it("Should claim airdrop", async function () {
        const { airdropAddress, owner } = await loadFixture(deployMerkleAirdrop);

        
    })
  })

  });