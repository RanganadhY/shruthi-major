pragma solidity ^0.8.0;

contract Donation {
    uint public totalDonation;
    uint public num = 20;
    mapping (address => uint[]) public userDonations;

    function donate(uint amount) public returns (string memory){
        totalDonation += amount;
        userDonations[msg.sender].push(amount);
        return "done";
    }
    function helloworld () public view returns (uint) {
        return num;
    }

    function getTotalDonation() public view returns (uint) {
        return totalDonation;
    }

    function getUserDonations(address user) public view returns (uint[] memory) {
        return userDonations[user];
    }
}
