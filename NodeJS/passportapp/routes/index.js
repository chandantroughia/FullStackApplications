var express = require('express');
var router = express.Router();

//get request
router.get('/', function(req, res){
  res.render('index');
});

//we have to make this accessible to other files.
module.exports = router;
