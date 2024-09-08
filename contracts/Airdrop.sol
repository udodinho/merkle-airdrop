// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract MerkleAirdrop {
    error NotOwner();
    error AirdropEnded();
    error ClaimedAirdrop();
    error InvalidProof();
    error InsufficientBalance();

    address owner;
    bytes32 public merkleRoot;
    address immutable tokenAddress;

    bool isActive = true;
    BitMaps.BitMap internal airdropped;

    event AirdropClaimed(address indexed user, uint256 amount);
    event WithdrawSuccessful(address indexed user, uint256 amount);
    event MerkleRootUpdatedSuccessful(bytes32 merkleRoot);

    constructor(address _tokenAddress, bytes32 _merkleRoot) {
        owner = msg.sender;
        tokenAddress = _tokenAddress;
        merkleRoot = _merkleRoot;
    }

    function claimAirdrop(uint256 _idx, uint256 _amount, bytes32[] calldata _proof) external {
        if(!isActive) {
            revert AirdropEnded();
        }

        if(BitMaps.get(airdropped, _idx)) {
            revert ClaimedAirdrop();
        }

        verifyProof(_idx, msg.sender, _amount, _proof);

        BitMaps.setTo(airdropped, _idx, true);

        IERC20(tokenAddress).transfer(msg.sender, _amount);
    }

    function verifyProof(uint256 _idx, address _user, uint256 _amount, bytes32[] calldata _proof) private view {
        bytes32 leaf = keccak256(abi.encode(_user, _idx, _amount));

        if(!MerkleProof.verify(_proof, merkleRoot, leaf)) { 
           revert InvalidProof(); 
        }
    }

    function ownerWithdraw(address _to) external {
        onlyOwner();

        uint256 _bal = IERC20(tokenAddress).balanceOf(address(this));

        if (_bal == 0) {
            revert InsufficientBalance();            
        }

        IERC20(tokenAddress).transfer(_to, _bal);
    }

    function updateMerkleRoot(bytes32 _merkleRoot) external {
        onlyOwner();

        merkleRoot = _merkleRoot;
    }

    function onlyOwner() private view {
        if(msg.sender != owner) {
            revert NotOwner();
        }
    }

    function isAirdropActive() external {
        onlyOwner();
        isActive = !isActive;
    }

}