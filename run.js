Web3 = require('web3');
solc = require('solc');
fs   = require('fs');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
code = fs.readFileSync('Voting.sol').toString();
compiledCode = solc.compile(code);

abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
VotingContract = web3.eth.contract(abiDefinition);
byteCode = compiledCode.contracts[':Voting'].bytecode;
deployedContract = VotingContract.new(['P1','P2','P3','VP1','VP2','VP3'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000});

deployedContract.address;
contractInstance = VotingContract.at(deployedContract.address);

// contractInstance.totalVotesFor.call('Rama')
// contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
// contractInstance.totalVotesFor.call('Rama').toLocaleString()
//
//
//
// {"constant":true,"inputs":[{"name":"","type":"address"}],"name":"hasVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},
//
// {"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"checkIfVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"}
