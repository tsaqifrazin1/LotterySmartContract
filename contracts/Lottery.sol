// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Lottery {
    address public manager;
    address[] public players;

    constructor(){
        manager= msg.sender;
    }

    function enter() public payable {
        require(msg.value > .0001 ether);
        players.push(msg.sender);
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;

        address winner = players[index];
        payable(winner).transfer(address(this).balance);     

        players = new address[](0);
    }

    function random() private view returns (uint){
        return uint(keccak256(abi.encode(block.prevrandao, block.timestamp, players)));
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[] memory){
        return players;
    }
}