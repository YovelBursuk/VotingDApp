
var one = artifacts.require("./ERC20ElectionToken.sol");
var two = artifacts.require("./ERC721ElectionNFT.sol");
var three = artifacts.require("./Election.sol");

module.exports = (deployer, network) => {
  deployer.deploy(one, 200000).then(function() {
    return deployer.deploy(two)
  }).then(function() {
    return deployer.deploy(three, one.address, two.address)
  });
};
