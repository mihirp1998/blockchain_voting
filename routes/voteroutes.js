var mysql      = require('mysql');
var voting     = require('./../voting');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Rasgulla*123',
  database : 'Votechain'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.vote = function(req,res){
  console.log('k');
  var presidentName= req.body.president;
  var vicePresidentName = req.body.vicepresident;
  console.log(req.body);
  var id = req.signedCookies.UserID;
  console.log(id);
  if(id === undefined) {
    res.status(401).send('Please login first');
  }
  else {
    connection.query('SELECT ethereum_address FROM users WHERE id = ?',[id], function (error, results, fields) {
      if (error) {
        res.status(400).send("Error occurred");
      }else{
        // console.log('The solution is: ', results);
        if(results.length > 0){
          addr = results[0].ethereum_address;
          var code = voting.voteForCandidates(addr, presidentName, vicePresidentName);
          res.clearCookie("UserID");
          res.sendStatus(code);
        }
        else{
          console.log("googoo");
          res.status(403).send("ID not found");
        }
      }
    });
  }
}
