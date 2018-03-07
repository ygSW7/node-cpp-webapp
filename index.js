var express = require("express");
var logger = require('morgan');
var app = express();
//app.use(morgan());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
