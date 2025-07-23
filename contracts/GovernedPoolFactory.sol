// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TokenRegistry.sol";

/// @title GovernedPoolFactory - example factory referencing a TokenRegistry
contract GovernedPoolFactory {
    TokenRegistry public immutable registry;
    address public owner;

    event RegistryUpdated(address indexed registry);

    constructor(address registry_) {
        registry = TokenRegistry(registry_);
        owner = msg.sender;
        emit RegistryUpdated(registry_);
    }

    function isTokenAllowed(address token) public view returns (bool) {
        return registry.listed(token);
    }
}
