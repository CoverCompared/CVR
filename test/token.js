const CVRToken = artifacts.require("CVRToken");
const { token } = require("../config");

var tokenInstance;
contract("CVR Token", function (accounts) {
  it("Deploy Tokens", function () {
    return CVRToken.new(token.cap)
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.name();
      })
      .then(function (name) {
        assert.equal(name, "Cover Token", "Token Name should be Cover Token");
        return tokenInstance.symbol();
      })
      .then(function (symbol) {
        assert.equal(symbol, "CVR", "Token symbol shoud be CVR");
        return tokenInstance.decimals();
      })
      .then(function (decimals) {
        assert.equal(decimals, 18, "Token should have 18 decimals");
        return;
      });
  });

  it("Should be able to mint the tokens", function () {
    return tokenInstance
      .mint(accounts[0], token.testMintValue)
      .then(function () {
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then(function (balance) {
        assert.equal(
          balance.toNumber(),
          token.testMintValue.toNumber(),
          "The relevant number of tokens must be minted"
        );
      });
  });

  it("Check the total supply", function () {
    return tokenInstance.totalSupply().then(function (totalSupply) {
      assert.equal(
        totalSupply.toNumber(),
        token.testMintValue.toNumber(),
        "The relevant number of tokens must be the total supply"
      );
    });
  });

  it("Should not be able to mint more than cap", function () {
    return tokenInstance
      .mint(accounts[1], token.cap)
      .then(function () {
        throw new Error("This minting should fail");
      })
      .catch(function (ex) {
        if (!ex) {
          throw new Error(
            "Token Minting shoud fail as this input makes the cap exceed"
          );
        }
      });
  });

  it("Should transfer the tokens", function () {
    return tokenInstance
      .transfer(accounts[1], token.testMintValue)
      .then(function () {
        return tokenInstance.balanceOf(accounts[1]);
      })
      .then(function (balance) {
        assert.equal(
          balance.toNumber(),
          token.testMintValue.toNumber(),
          "The relevant number of tokens must be transfer from one account to another"
        );
      });
  });

  it("Should be able to burn the tokens", function () {
    return tokenInstance
      .burn(token.testMintValue, { from: accounts[1] })
      .then(function () {
        return tokenInstance.totalSupply();
      })
      .then(function (totalSupply) {
        assert.equal(
          totalSupply.toNumber(),
          0,
          "Total Supply should be 0 after burning all the tokens"
        );
        return;
      });
  });
});
