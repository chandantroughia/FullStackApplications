var express = require('express');
var router = express.Router();

//get request
router.get('/',ensureAuthentication, function(req, res){
  res.render('index');
});

function ensureAuthentication(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}

//we have to make this accessible to other files.
module.exports = router;
