var Trufflesample = artifacts.require("./Trufflesample1.sol");

module.exports = function(deployer) {
  deployer.deploy(Trufflesample);
};
