// Server Setup
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

// START THE SERVER
var port = process.env.PORT || 2222;
app.listen(port);
console.log('Open this URl on browser : localhost:' + port+ );