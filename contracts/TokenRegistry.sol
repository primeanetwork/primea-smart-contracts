// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title TokenRegistry - maintains a whitelist of tokens for pool creation
contract TokenRegistry {
    address public owner;
    mapping(address => bool) public listed;

    event TokenListed(address indexed token, bool listed);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setToken(address token, bool status) external onlyOwner {
        listed[token] = status;
        emit TokenListed(token, status);
    }
}
