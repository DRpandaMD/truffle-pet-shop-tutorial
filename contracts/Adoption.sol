// From Truffleframework.com
// A pet Shop Tutorial
// Michael Zarate

pragma solidity ^0.4.4;

contract Adoption
{
    address[16] public adopters;

    //Lets adopt a pet  *NOTE* function declarations must be made INSIDE of a contract
    function adopt(uint petId) public returns (uint)
    {
        require(petId >=0 && petId <= 15);
        adopters[petId] = msg.sender;
        return petId;
    }

    function getAdopters() public returns (address[16])
    {
        return adopters;
    }
}

