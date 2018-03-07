var express = require('express');
var path = require('path')
var router = express.Router();
var temp = require('temp');
//var fs = require('fs');
var http = require('http');

var formidable = require('formidable'),
    //http = require('http'),
    util = require('util'),
    fs   = require('fs-extra');

var server = http.createServer(function(req, res) { // var server
    res.writeHead(200, {'Content-Type': 'text/html'
    });

  /* Process the form uploads */
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});//plain

      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
 
    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
    });
 
    form.on('error', function(err) {
        console.error(err);
    });
 
    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
	
        var new_location = path.resolve(__dirname) +'/'; //'c:/localhost/nodejs/';//
 	
	fs.copy(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
    });

    return;
  }

  //const { exec } = require('child_process');//yg
  //exec('mv old_file_name new_file_name');//yg
  //exec('mv input.txt inputTest.csv');//yg
  
  /* Display the file upload form. */
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
//});



var type = 'standalone_flex_fileH'//yg


  //var server = http.createServer(function(req, res) {  
  //res.writeHead(200, {'Content-Type': 'text/html'
  //});
  //res.write('<!doctype html>\n<html lang="en">\n' + 
  //  '\n<meta charset="utf-8">\n<title>C++ and node.js</title>\n' + 
  // '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
  //  '\n\n<h1>C++ WebApp using Node.js</h1>\n' + 
  //  '<div id="content"><p>  </p><ul><li>"average" </li></ul></div>' + 
  //  '\n\n');
 
  //res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  //res.write('<input type="file" name="filetoupload"><br>');
  //res.write('<input type="submit">');
  //res.write('</form>');+-

        //console.log("to here 1 ");

  router.get('/', function(req, res) {  //yg
    res.render('primes', {target:type});  //yg
  });
       console.log("to here 2 ");//yg

  //router.post('/', function(req, res) { //yg  do not need this line
       
  console.log("to here 3 ");

  var exec = require('child_process').exec;
  var execFile = require('child_process').execFile
  var program = "./cpp/standalone_flex_fileH/build/Release/standalone_flex_fileH";
//    var under = parseInt(req.body.under);

//temp.mkdir('node_example', function(err, dirPath) {
    //  var inputPath = path.join(__dirPath, 'input.txt');
    //  var outputPath = path.join(__dirPath, 'output.txt');
        
    var inputPath = path.join(__dirname, 'input.csv');
    var outputPath = path.join(__dirname, 'output.csv');
        console.log("inputPath " + inputPath);
 	console.log("outputPath " + outputPath);

    //  fs.writeFile(inputPath, under, function(err) {
    //    if (err) throw err;
        
    var primes = execFile(program, [inputPath, outputPath], function(error) {
            if (error ) throw error;
           // fs.readFile(outputPath, function(err, data) {
           //   if (err) throw err;
        //});
     // });
    //});
  });
});

module.exports = router;

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});