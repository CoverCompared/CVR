const CVRSale = artifacts.require("CVRSale");
const CVRToken = artifacts.require("CVRToken");

const { crowdsale } = require("../config");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(CVRSale, crowdsale.rate, accounts[accounts.length - 1], CVRToken.address);
};
