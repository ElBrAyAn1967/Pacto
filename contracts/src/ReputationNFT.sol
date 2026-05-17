// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/utils/Counters.sol";

/// @title ReputationNFT - Soulbound token for PYME reputation
/// @notice Non-transferable NFT representing financial reputation
contract ReputationNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Reputation structure
    struct Reputation {
        uint256 score;              // 0-1000 (100 = 10.0)
        uint256 transactionCount;   // Total validated transactions
        uint256 validationRate;     // % validated (0-100)
        uint256 createdAt;          // Creation timestamp
        uint256 lastUpdate;         // Last update timestamp
        string metadataURI;         // Additional metadata
    }

    // Mappings
    mapping(uint256 => Reputation) public reputations;
    mapping(address => uint256) public addressToTokenId;
    mapping(address => bool) public authorizedValidators;

    // Events
    event ReputationCreated(address indexed pyme, uint256 tokenId, uint256 timestamp);
    event ReputationUpdated(address indexed pyme, uint256 newScore, uint256 timestamp);
    event ValidatorAuthorized(address indexed validator);
    event ValidatorRevoked(address indexed validator);

    constructor() ERC721("PACTO Reputation", "PREP") {}

    /// @notice Create new reputation for a PYME
    function createReputation(address pyme) external returns (uint256) {
        require(addressToTokenId[pyme] == 0, "Reputation already exists");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(pyme, newTokenId);
        
        reputations[newTokenId] = Reputation({
            score: 0,
            transactionCount: 0,
            validationRate: 0,
            createdAt: block.timestamp,
            lastUpdate: block.timestamp,
            metadataURI: ""
        });
        
        addressToTokenId[pyme] = newTokenId;
        
        emit ReputationCreated(pyme, newTokenId, block.timestamp);
        
        return newTokenId;
    }

    /// @notice Update reputation score
    function updateScore(uint256 tokenId, uint256 newScore) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        require(newScore <= 1000, "Score must be 0-1000");
        
        reputations[tokenId].score = newScore;
        reputations[tokenId].lastUpdate = block.timestamp;
        
        emit ReputationUpdated(ownerOf(tokenId), newScore, block.timestamp);
    }

    /// @notice Get reputation for a PYME
    function getReputation(address pyme) external view returns (Reputation memory) {
        uint256 tokenId = addressToTokenId[pyme];
        require(tokenId != 0, "No reputation found");
        return reputations[tokenId];
    }

    /// @notice Check if address has reputation
    function hasReputation(address pyme) external view returns (bool) {
        return addressToTokenId[pyme] != 0;
    }

    // SOULBOUND: Override transfer functions to make it non-transferable
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        require(from == address(0) || to == address(0), "Soulbound: cannot transfer");
    }

    function approve(address, uint256) public pure override {
        revert("Soulbound: cannot approve");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("Soulbound: cannot set approval");
    }
}
