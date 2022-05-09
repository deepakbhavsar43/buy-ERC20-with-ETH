//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TestCoin is ERC20, Ownable, ReentrancyGuard {

    uint256 private tokenPerEth = 10;

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) ERC20 (_name, _symbol) {
        _mint(address(this), _totalSupply * (10 ** decimals()));
    }

    function buyToken() public payable nonReentrant {
        _transfer(address(this), msg.sender, msg.value * tokenPerEth);
    }

    function withdrawMoney() public {
        address payable to = payable(msg.sender);
        to.transfer(getBalance());
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function getTokenPerEth() public view returns(uint256) {
        return tokenPerEth;
    }

    function setTokenPerEth(uint256 _tokenPerEth) public onlyOwner {
        tokenPerEth = _tokenPerEth;
    }

}
