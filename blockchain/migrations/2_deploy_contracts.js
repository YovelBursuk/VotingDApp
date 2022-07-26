// const ERC20Basic = artifacts.require("ERC20Basic");

// module.exports = function (deployer) {
//     deployer.deploy(ERC20Basic, 1000000);
// };

// var ERC20Basic = artifacts.require("ERC20Basic");
// var Election = artifacts.require("Election");

// module.exports = function(deployer) {
//   return deployer.deploy(ERC20Basic, 1000000).then(function() {
//     return deployer.deploy(Election, ERC20Basic.address)
//   });
// };


var One = artifacts.require("./ERC20Basic.sol");
var Two = artifacts.require("./Election.sol");

module.exports = (deployer, network) => {
  deployer.deploy(One, 200000).then(function() {
    return deployer.deploy(Two, One.address)
  });
};
