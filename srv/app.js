var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var auth = require('./routes/auth');
var projects = require('./routes/projects');
var elements = require('./routes/elements')
var digitalservices = require('./routes/digitalservices');
var profiles = require('./routes/profiles');
var session = require('./session');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://user:pass@ds011472.mlab.com:11472/digitizer');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!');
});

var app = express();
var favicon = require('serve-favicon');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist'));
app.use('/bower_components',  express.static('bower_components'));
app.get('/', function(req,res) {
  res.sendFile('index.html', {'root': 'dist/'});
});

session.configure();
auth.configure(app);
app.all('*', session.ensureAuthenticated);
projects.configure(app);
digitalservices.configure(app);
elements.configure(app);
profiles.configure(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
