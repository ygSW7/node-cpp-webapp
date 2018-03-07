var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs   = require('fs-extra');

//var path = require('path'); //yg
var express = require('express')
    path = require('path'),
    router = express.Router(),
    temp = require('temp');
    //fs = require('fs');
var type = path.basename(__filename).slice(0, -3);
 
    //global.appRoot = path.resolve(__dirname); //yg
    //console.log(global.appRoot); //yg

/*/yg ---
http.createServer(function(req, res) {  
  res.writeHead(200, {'Content-Type': 'text/html'
  });  
   res.write('<!doctype html>\n<html lang="en">\n' + 
    '\n<meta charset="utf-8">\n<title>C++ and node.js</title>\n' + 
    '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
    '\n\n<h1>C++ WebApp using Node.js</h1>\n' + 
    '<div id="content"><p>  </p><ul><li>"average" </li></ul></div>' + 
    '\n\n');
//});  
//yg */


http.createServer(function(req, res) {
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
	console.log('1');
        var new_location = path.resolve(__dirname) +'/'; //'c:/localhost/nodejs/';//
 	console.log('2');
	fs.copy(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
    });

 	
	/* rename to C++ input */
    
/*form.on('end', function(fields, files) {

	//var inputPath = path.join(__dirPath, 'input.txt');		
	//var working_path = = 'global.appRoot/';

	var file_name1 = this.openedFiles[0].name;

	console.log(file_name1);
	
	//fs.rename('inputTest.csv', file_name1, function (err) {
    	//  if (err) throw err;
        //console.log('File Renamed!');
  	//});
	
	//fs.copy(c_path, w_path, function(err) {  
        //    if (err) {
        //        console.error(err);
        //    } else {
        //        console.log("success!")
        //    }
        //});
    });   */
    
    return;
  }

  //const { exec } = require('child_process');//yg
  //exec('mv old_file_name new_file_name');//yg
  //exec('mv input.txt inputText.csv');//yg
  
  /* Display the file upload form. */
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );

  /* C++ */

//http.createServer(function(req, res) {  
  res.writeHead(200, {'Content-Type': 'text/html'
  });
  router.get('/', function(req, res) {
  res.render('primes', {target:type});
  });
       console.log("to here 2 ");

       
router.post('/', function(req, res) {
       
console.log("to here 3 ");

    var exec = require('child_process').exec;
    var execFile = require('child_process').execFile
    var program = "../cpp/standalone_flex_fileHarrow/build/Release/standalone_flex_fileHarrow";
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
            fs.readFile(outputPath, function(err, data) {
              if (err) throw err;
           //   var primes = data.toString().split('\n').slice(0, -3)
           //                   .map(function (line) {
           //                       return parseInt(line);
            //                  });
            //  res.setHeader('Content-Type', 'application/json');
            //  res.end(JSON.stringify({
            //    results: primes
            //  }));

              //exec('rm -m ' + dirPath, function(error) {             
              //exec('del ' + __dirname, function(error) {

              //  if (error) throw error;
              //  console.log("Removed " + dirPath);
             // })
          });
        });
     // });
   // });
  //});

});

module.exports = router; 
}).listen(5000);