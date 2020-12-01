const CVRToken = artifacts.require("CVRToken");
const { token } = require("../config");

module.exports = function (deployer) {
  deployer.deploy(CVRToken, token.cap);
};
