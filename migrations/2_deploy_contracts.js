//2_deploy_contracts.js
//a migration script to deploy the adoption smart contract

var Adoption = artifacts.require("Adoption");

module.exports = function(deployer){
    deployer.deploy(Adoption);
};