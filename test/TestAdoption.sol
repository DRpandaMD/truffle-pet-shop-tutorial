//TestAdoption.sol
//A test file for the Adoption Contract

pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses";
import "../contracts/Adoption.sol";

contract TestAdoption{
    Adoption adoption = Adoption(DeployedAddresses.Adoption());
}