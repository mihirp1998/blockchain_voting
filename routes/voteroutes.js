var mysql      = require('mysql');
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

exports.login = function(req,res){
  var presidentName= req.body.president;
  var vicePresidentName = req.body.vicepresident;
  console.log(req.body);
  connection.query('SELECT * FROM sessions WHERE id = ?',[id], function (error, results, fields) {
  if (error) {
    res.status(400).send("Error occurred");
  }else{
    // console.log('The solution is: ', results);
    if(results.length > 0){
      if(results[0].password == password){
        console.log("ok");
        res.set('Content-Type', 'application/json');
        res.status(200).sendFile("/Users/Shaleen/blockchain_voting/voting.html");
      }
      else{
        console.log("booboo");
        res.status(201).send("ID and Password do not match");
      }
    }
    else{
      console.log("googoo");
      res.status(201).send("ID not found");
      }
    }
  });
}
