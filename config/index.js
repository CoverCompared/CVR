const webUtils = require("web3-utils");

module.exports = {
    token: {
        cap: new webUtils.BN("123400000000000000000000"),
        testMintValue: new webUtils.BN("100")
    },
    crowdsale: {
        rate: new webUtils.BN("1"),
        ethToSpendForBuying: new webUtils.BN("5")
    }
}