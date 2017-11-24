var express = require('express');
var router = express.Router();

//login page with GET
router.get('/login', function(req, res){
  res.render('login');
});

//Register page with GET
router.get('/register', function(req, res){
  res.render('register');
});

//we have to make this accessible to other files.
module.exports = router;
