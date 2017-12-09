//TestAdoption.sol
//A test file for the Adoption Contract

pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption{
    //creates a new Adoption Smart contract with the name adoption
    Adoption adoption = Adoption(DeployedAddresses.Adoption());

    //Lets test the adopt() function
    function testUserCanAdoptPet()
    {
        uint returnedId = adoption.adopt(8);

        uint expected = 8;

        Assert.equal(returnedId, expected, "Adoption of the ped ID 8 should be recorded.");
    }

    //Now lets test the retrieval of single pet's owner
    function testGetAdopterAddressByPetId()
    {
        //expected owner is this contract
        //this is a contract-wide variable that gets the current contact's address
        address expected = this;

        address adopter = adoption.adopters(8);

        Assert.equal(adopter, expected, "Owner of pet ID 8 should be recorded.");

    }

    //Now let us test the retrieval of ALL pet owners
    function testGetAdopterAddressByPetIdInArray()
    {
        //expected owner is this contract
        address expected = this;

        //now store all the adopters in memory
        address[16] memory adopters = adoption.getAdopters();

        Assert.equal(adopters[8], expected, "Owner of pet ID 8 should be recorded.");
    }
}