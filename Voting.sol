pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */

  mapping (bytes32 => uint8) public votesReceived;
  mapping (address => bool) public hasVoted;

  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */

  bytes32[] public candidateList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Voting(bytes32[] candidateNames) public {
    candidateList = candidateNames;
  }

  function checkIfVoted(address addr) view public returns (bool) {
    return hasVoted[addr];
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 candidate) view public returns (uint8) {
    return votesReceived[candidate];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidates(bytes32[] candidates) public {
    for(uint i = 0; i < candidates.length; i++) {
      votesReceived[candidates[i]] += 1;
    }
    hasVoted[msg.sender] = true;
  }

}


// mnemonic: "sorry tragic airport arrive tortoise notice toast mad error aware bleak chronic"
