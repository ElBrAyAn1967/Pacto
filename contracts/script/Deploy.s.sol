// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/ReputationNFT.sol";
import "../src/TransactionRegistry.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        ReputationNFT reputationNFT = new ReputationNFT();
        console.log("ReputationNFT deployed at:", address(reputationNFT));
        
        TransactionRegistry txRegistry = new TransactionRegistry();
        console.log("TransactionRegistry deployed at:", address(txRegistry));
        
        vm.stopBroadcast();
    }
}
