// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;


contract ERC20Basic{
    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;
    uint256 totalSupply_ = 0;
    uint256 totalVisits = 0;
    address tokenOwner;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor (uint256 total) public {
        totalSupply_ = total;
        tokenOwner = msg.sender;
        balances[tokenOwner] = totalSupply_;
        totalVisits = totalVisits + 1;
    }

    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }

    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint numTokens) public returns (bool) {
        require(numTokens <= balances[tokenOwner]);
        balances[tokenOwner] = balances[tokenOwner] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(tokenOwner, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint numTokens) public returns (bool) {
        allowed[tokenOwner][delegate] = numTokens;
        emit Approval(tokenOwner, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint numTokens) public returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][tokenOwner]);
        balances[owner] = balances[owner]-numTokens;
        allowed[owner][tokenOwner] = allowed[owner][tokenOwner]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}