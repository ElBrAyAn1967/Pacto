// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title TransactionRegistry - Commercial transaction registry
/// @notice Stores validated transactions between businesses
contract TransactionRegistry {
    
    struct Transaction {
        bytes32 txHash;
        address pyme;
        address counterparty;
        uint256 amount;
        string currency;
        string description;
        bool validatedByPyme;
        bool validatedByCounterparty;
        uint256 timestamp;
        bool exists;
    }

    mapping(bytes32 => Transaction) public transactions;
    mapping(address => bytes32[]) public pymeTransactions;
    mapping(address => bytes32[]) public counterpartyTransactions;
    
    uint256 public totalTransactions;
    
    event TransactionRegistered(bytes32 indexed txHash, address indexed pyme, address indexed counterparty, uint256 amount);
    event TransactionValidated(bytes32 indexed txHash, address indexed validator);
    
    function registerTransaction(
        address _counterparty,
        uint256 _amount,
        string memory _currency,
        string memory _description
    ) external returns (bytes32) {
        require(_counterparty != address(0), "Invalid counterparty");
        require(_counterparty != msg.sender, "Cannot transact with self");
        require(_amount > 0, "Amount must be greater than 0");
        
        bytes32 txHash = keccak256(abi.encodePacked(
            msg.sender,
            _counterparty,
            _amount,
            _currency,
            block.timestamp,
            totalTransactions
        ));
        
        require(!transactions[txHash].exists, "Transaction already exists");
        
        transactions[txHash] = Transaction({
            txHash: txHash,
            pyme: msg.sender,
            counterparty: _counterparty,
            amount: _amount,
            currency: _currency,
            description: _description,
            validatedByPyme: true,
            validatedByCounterparty: false,
            timestamp: block.timestamp,
            exists: true
        });
        
        pymeTransactions[msg.sender].push(txHash);
        counterpartyTransactions[_counterparty].push(txHash);
        
        totalTransactions++;
        
        emit TransactionRegistered(txHash, msg.sender, _counterparty, _amount);
        
        return txHash;
    }
    
    function validateTransaction(bytes32 _txHash) external {
        Transaction storage tx = transactions[_txHash];
        
        require(tx.exists, "Transaction does not exist");
        require(msg.sender == tx.counterparty, "Only counterparty can validate");
        require(!tx.validatedByCounterparty, "Already validated");
        
        tx.validatedByCounterparty = true;
        
        emit TransactionValidated(_txHash, msg.sender);
    }
    
    function getTransaction(bytes32 _txHash) external view returns (Transaction memory) {
        require(transactions[_txHash].exists, "Transaction does not exist");
        return transactions[_txHash];
    }
    
    function isFullyValidated(bytes32 _txHash) external view returns (bool) {
        Transaction memory tx = transactions[_txHash];
        require(tx.exists, "Transaction does not exist");
        return tx.validatedByPyme && tx.validatedByCounterparty;
    }
    
    function getPymeTransactions(address _pyme) external view returns (bytes32[] memory) {
        return pymeTransactions[_pyme];
    }
    
    function getValidatedTransactionCount(address _pyme) external view returns (uint256) {
        bytes32[] memory txs = pymeTransactions[_pyme];
        uint256 count = 0;
        
        for (uint i = 0; i < txs.length; i++) {
            if (transactions[txs[i]].validatedByCounterparty) {
                count++;
            }
        }
        
        return count;
    }
}
