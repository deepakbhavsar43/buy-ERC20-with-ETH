const { expect, assert } = require("chai");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("Test Coin", function () {
  let testCoin, owner, addr1;
  before(async function () {
    const TestCoin = await hre.ethers.getContractFactory("TestCoin");
    testCoin = await TestCoin.deploy("Test Coin", "TestCoin", 10000);

    await testCoin.deployed();

    console.log("   Test Coin deployed to:", testCoin.address);

    [owner, addr1] = await ethers.getSigners();
  });

  it("should buy 10 token with 1 ETH", async function () {
    let tx = await testCoin.connect(addr1).buyToken({ value: ethers.utils.parseEther("1") });
    assert.isOk(tx);

    let balance = await testCoin.balanceOf(addr1.address);
    assert.equal(balance.toString(), 10 * (10 ** 18));
  })

  it("should get contract's ether balance", async function () {
    let cBalance = await testCoin.getBalance();
    assert.equal(cBalance, 1 * ( 10 ** 18));
  })

  it("user except owner should not be able to change exchange rate", async function() {
    let tx = await testCoin.connect(owner).setTokenPerEth(20);
    assert.isOk(tx);
  })
});
