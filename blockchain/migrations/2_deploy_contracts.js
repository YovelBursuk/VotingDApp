
var One = artifacts.require("./ERC20Basic.sol");
var Three = artifacts.require("./ERC721Basic.sol");
var Two = artifacts.require("./Election.sol");

module.exports = (deployer, network) => {
  deployer.deploy(One, 200000).then(function() {
    return deployer.deploy(Three)
  }).then(function() {
    return deployer.deploy(Two, One.address, Three.address)
  });
};
