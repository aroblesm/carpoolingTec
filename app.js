let compression = require('compression');
let express = require('express');
let app = express();
const port = 3000;

app.use(compression());

// view engine setup
app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');
app.set('view cache', true);

app.use("/common", express.static(__dirname + '/common'));

require('dotenv').config();
var path = require('path');
var favicon = require('serve-favicon');
var passport = require('passport');
var flash = require('connect-flash');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var configDB = require('./config/db');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// required for passport
require('./config/passport').setupPassport(passport);
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
});

require('./routes')(app, passport);

module.exports = app;