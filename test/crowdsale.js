const CVRToken = artifacts.require("CVRToken");
const CVRSale = artifacts.require("CVRSale");

const { token, crowdsale } = require("../config");

var tokenInstance;
var crowdsaleInstance;

contract("CVR Crowdsale", function (accounts) {
  it("Deploy Contracts", function () {
    return CVRToken.new(token.cap)
      .then(function (instance) {
        tokenInstance = instance;
        return CVRSale.new(
          crowdsale.rate,
          accounts[accounts.length - 1],
          tokenInstance.address
        );
      })
      .then(function (instance) {
        crowdsaleInstance = instance;
        return;
      });
  });

  it("Send some tokens to crowdsale contract for distribution", function () {
    return tokenInstance
      .mint(crowdsaleInstance.address, token.testMintValue)
      .then(function () {
        return tokenInstance.balanceOf(crowdsaleInstance.address);
      })
      .then(function (balance) {
        assert.equal(
          balance.toNumber(),
          token.testMintValue.toNumber(),
          "Crowdsale contract should have some balance for distribution"
        );
        return;
      });
  });

  it("Verify CVRSale contract", function () {
    return crowdsaleInstance.rate().then(function (rate) {
      assert(
        rate.toNumber(),
        crowdsale.rate,
        "CrowdSale rate should be as expected"
      );
      return;
    });
  });

  it("Buy Tokens and verify wei raised", function () {
    let testingAccount1 = accounts[10];
    return crowdsaleInstance
      .buyTokens(testingAccount1, {
        from: testingAccount1,
        value: crowdsale.ethToSpendForBuying,
      })
      .then(function () {
        return tokenInstance.balanceOf(testingAccount1);
      })
      .then(function (tokenBalance) {
        assert.equal(
          tokenBalance.toNumber(),
          crowdsale.ethToSpendForBuying.toNumber(),
          "Crowdsale tokens shoud be as expected"
        );
        return crowdsaleInstance.weiRaised();
      })
      .then(function (weiRaised) {
        assert.equal(
          weiRaised.toNumber(),
          crowdsale.ethToSpendForBuying.toNumber(),
          "Wei raised should be as expected"
        );
        return;
      });
  });
});
