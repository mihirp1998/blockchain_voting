var x = sessionStorage.getItem('test');
alert(x);
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidates","type":"bytes32[]"}],"name":"voteForCandidates","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"hasVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"checkIfVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"}]');
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xcbc112d61b20efa59d36001c3d2541959edd28f2');
// candidates1 = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}
// candidates2 = {"Ramu": "candidate-1", "Nicu": "candidate-2", "Josu": "candidate-3"}

function voteForCandidate() {
  if(!contractInstance.hasVoted.call(web3.eth.accounts[0])) {
    prezName = document.querySelector('input[name=president]:checked').value;
    viceprezName = document.querySelector('input[name=vicepresident]:checked').value;
    confirmation = confirm("Confirm your votes\nPresident: " + prezName + "\nVice President: " + viceprezName);
    if(confirmation) {
      var candidates = [prezName, viceprezName];
      if(sessionStorage.getItem('test') != null) {
        contractInstance.voteForCandidates(candidates, {from: web3.eth.accounts[0]}, function() {
        });
        alert("Your vote has been recorded.\nYou will be logged out now.");
        window.location.replace("file:///Users/Shaleen/blockchain_voting/Login_v1/index.html");
      }
      else {
        alert('failed');
      }
    }
    else {
      alert("Vote kyu dabaya be?");
    }
  }
  else {
    alert("You have already voted.");
    alert("We are kicking you out. Run.");
    sleep(2000).then(() => {
      // window.close();
    });
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// $(document).ready(function() {
//   candidateNames = Object.keys(candidates);
//   for (var i = 0; i < candidateNames.length; i++) {
//     let name = candidateNames[i];
//     let val = contractInstance.totalVotesFor.call(name).toString()
//     $("#" + candidates[name]).html(val);
//   }
// });
