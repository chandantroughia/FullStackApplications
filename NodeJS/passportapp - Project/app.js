var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var flash = require('connect-flash');


/*break our route in two different sections
  1. Index - home page
  2. Users - registration/login etc
  */

  var routes = require('./routes/index');
  var users = require('./routes/users');

  var app = express();

  //view Engine
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  //static Folder
  app.use(express.static(path.join(__dirname, 'public')));

  //For bootstrap
  app.use('/css', express.static(__dirname+ '/node_modules/bootstrap/dist/css'));

  //body bodyParser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Expression Middleware -- get it from the expressSession git page
  app.use(session({
      secret: 'secret',
      saveUninitialized: true,
      resave: true
  }));

  //Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Express Validator Middleware (got this from the documentation website)
  app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


  // Connect-Flash Middleware
  app.use(flash());
  app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });


  //we gonna create a global variable so that we can access the user information
  //and we are using middleware to do so, route to everything
  app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
  })



  // Define Routes
  app.use('/', routes);
  app.use('/users', users);

  app.listen(3000);
  console.log('Server started on port 3000');
