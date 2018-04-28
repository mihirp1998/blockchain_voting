var express    = require("express");
// var session = require("express-session");
var login = require('./routes/loginroutes');
// var vote = require('./routes/voteroutes')
var bodyParser = require('body-parser');
// var MySQLStore = require('express-mysql-session')(session);

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// var options = {
//   host     : 'localhost',
//   port     : 3306,
//   user     : 'root',
//   password : 'Rasgulla*123',
//   database : 'Votechain',
//   checkExpirationInterval: 60000,
//   // expiration: 180000
// };

// var sessionStore = new MySQLStore(options);

// session cookie setup
// app.use('/login', session({
//     name: "something",
//     secret: "SEEKRIT KEY LULZ 69",
//     // store: sessionStore,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { httpOnly : false, maxAge: 180000 }
//   })
// );

var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: 'welcome to our upload module apis'});
});

//route to handle user login
router.post('/login',login.login)
// router.post('/vote', vote.vote)
app.use('/api', router);
app.listen(5000);
