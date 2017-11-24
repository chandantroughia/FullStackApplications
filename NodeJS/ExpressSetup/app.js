var express = require('express');
var bp = require('body-parser');
var path = require('path');

var port = 3000;

var app = express();


app.use(function(req, res, next){
	console.log('Time: ', Date.now());
	next();
});

app.use(bp.json());
app.use(bp.urlencoded({extended: false}));

//in case we don't want to use dynamic routing we can make the satic folder with our required files and we have to tell node to
//where the folder with the static files is
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.send('Hello World!');
});

//if we want to make a route for about page
app.get('/about', function(req, res){
	res.send('About Page');
});

app.listen(port);
console.log('Server started on port '+port);

module.exports = app;
