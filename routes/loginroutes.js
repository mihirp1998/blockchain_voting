var mysql      = require('mysql');
var cookieParser = require('cookie-parser');
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
  var id= req.body.id;
  var password = req.body.password;
  console.log(req.body);
  connection.query('SELECT * FROM users WHERE id = ?',[id], function (error, results, fields) {
  if (error) {
    res.status(400).send("Error occurred");
  }else{
    // console.log('The solution is: ', results);
    if(results.length > 0){
      if(results[0].password == password){
        console.log("ok");
        var cookie = req.signedCookies.sessID;
        if (cookie === undefined)
        {
          // no: set a new cookie
          var randomNumber=Math.random().toString();
          randomNumber=randomNumber.substring(2,randomNumber.length);
          res.cookie('sessID',randomNumber, { maxAge: 120000, httpOnly: true, signed: true});
          res.cookie('UserID', id, { maxAge: 120000, httpOnly: true, signed: true});
          console.log('cookie created successfully');
        }
        else
        {
          // yes, cookie was already present
          console.log('cookie exists', cookie);
        }
        res.setHeader('Content-type', 'text/html');
        res.status = 200;
        fs = require('fs')
        voting = fs.readFileSync('/Users/Shaleen/blockchain_voting/voting.html');
        res.write(voting);
        console.log("okok");
        // res.sendFile('/Users/Shaleen/blockchain_voting/voting.html');
        // res.cookie('SESS_ID', id).send('');
        res.end();
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
