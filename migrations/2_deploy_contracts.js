const TokenVesting = artifacts.require("TokenVestingNative")

module.exports = function(deployer) {
  const beneficiary = "0x1E6876a6C2757de611c9F12B23211dBaBd1C9028"

  const start = 1597396856
  const cliff = 31536000 // ~1 yr
  const duration = 126144000 // ~4yrs
  const amount = 5000 * 1e18

  deployer.deploy(TokenVesting, beneficiary, start, cliff, duration, true)
		
}
