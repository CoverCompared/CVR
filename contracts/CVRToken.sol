pragma solidity ^0.5.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";

contract CVRToken is ERC20, ERC20Detailed, ERC20Burnable, ERC20Capped {
    constructor(uint256 totalSupply)
        public
        ERC20Detailed("Cover Token", "CVR", 18)
        ERC20Capped(totalSupply)
    {}
}
