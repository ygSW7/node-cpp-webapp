var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs   = require('fs-extra'),
    path = require('path');//yg
 
    global.appRoot = path.resolve(__dirname);//yg
    //console.log(global.appRoot);//yg

http.createServer(function(req, res) {
  /* Process the form uploads */
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
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
	
	console.log(global.appRoot);
	console.log('1');
        var new_location = path.resolve(__dirname) +'/'; //'c:/localhost/nodejs/';//
 	console.log('2');
	fs.copy(temp_path, new_location + file_name, function(err) {  
	//fs.copy(temp_path, file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
    });

 	
	/* rename to C++ input 
    form.on('end', function(fields, files) {
	//var c_path = 'c:/localhost/nodejs/';
	
	//var inputPath = path.join(__dirPath, 'input.txt');	
	
	var w_path = = 'global.appRoot/';
	var file_name1 = this.openedFiles[0].name;
	fs.rename('input.csv', file_name1, function (err) {
    	  if (err) throw err;
        console.log('File Renamed!');
  	});
	
	fs.copy(c_path, w_path, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
    });   
    */
    return;
  }
 
  /* Display the file upload form. */
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
 
}).listen(5000);