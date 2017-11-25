var express = require('express');
var router = express.Router();

//out ORM
var mongojs = require('mongojs');
//database intstance
var db= mongojs('passportapp', ['users']);
//to encrypting the passwords
var bcrypt = require('bcryptjs');
//for authentication
var passport = require('passport'); // we can use google, facebook authentication with passport but we will use the local database
//this is for local
var LocalStrategy = require('passport-local').Strategy;


//login page with GET
router.get('/login', function(req, res){
  res.render('login');
});

//Register page with GET
router.get('/register', function(req, res){
  res.render('register');
});


//we need to set a post request
router.post('/register', function(req, res){
  //res.render('register');

  //get values from the form
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Validation
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Please use a valid email address').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  //check for Errors
  var errors = req.validationErrors();

  if(errors){
    console.log('Form has errors....');
    res.render('register',{
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });

  }else{
    var newUser = {
      name: name,
      email: email,
      username: username,
      password: password
    }

    //use bcrypt to encrypt Passwords
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        newUser.password = hash;

        //database interaction
        db.users.insert(newUser, function(err, doc){
          if(err){
            res.send(err);
          } else {
            console.log('User Added...');

            //Success Message
            req.flash('success', 'You are registered and can now log in');

            // Redirect after register
            res.location('/');
            res.redirect('/');
          }
        });
      });
    });
  }
});

//use need to serialize and deserialize user, because we want to access
//their information even if they are logged in
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
 db.users.findOne({_id: mongojs.ObjectId(id)}, function(err, user){
 	done(err, user);
 });
});


//we need to get the username of the user trying to login

passport.use(new LocalStrategy(
	function(username, password, done){
		db.users.findOne({username: username}, function(err, user){
			if(err) {
				return done(err);
			}
			if(!user){
				return done(null, false, {message: 'Wrong username'});
			}

			bcrypt.compare(password, user.password, function(err, isMatch){
				if(err) {
					return done(err);
				}
				if(isMatch){
					return done(null, user);
				} else {
					return done(null, false, {message: 'Wrong password'});
				}
			});
		});
	}
	));

// Login - POST
router.post('/login',passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/users/login',
                                     failureFlash: 'Wrong Username Or Password' }),
    function(req, res){
    	console.log('Auth Successfull');
    	res.redirect('/');
    });

//Logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You have successfully logged out!');
  res.redirect('/users/login');
});


module.exports = router;
