var express    = require("express");
// var session = require("express-session");
var login = require('./routes/loginroutes');
var vote = require('./routes/voteroutes')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var MySQLStore = require('express-mysql-session')(session);

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://10.30.26.212:8000");
    res.header("Access-Control-Allow-Origin", "http://192.168.43.225:8000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cookieParser("This is brilliant oh yeah 193urfnjeksoiqhrqh0rh"));

var router = express.Router();

router.get('/', function(req, res) {
  res.send('ok cool');
});

//route to handle user login
router.post('/login',login.login)
router.post('/vote', vote.vote)
app.use('/api', router);
app.listen(5000);
