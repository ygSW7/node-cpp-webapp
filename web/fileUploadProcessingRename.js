// import required modules
    var express = require('express');
    var formidable = require("formidable"); // used for parsing form data
    var fs = require('fs');
    var bodyParser = require('body-parser'); 

// prevent bodyParser from handling multipart forms (ie only handle get and post requests)
    delete express.bodyParser.parse['multipart/form-data'];

// create server
    var app = express.createServer();

// connect middleware
    app.configure(function() {
        // creates body object on request object
            //app.use(express.bodyParser());//yg
            //app.use(express.methodOverride());//yg
        // used to display static files such as css
            //app.use(express.static(__dirname + '/static'));//yg
    });

// enable and define views
    //app.set('views', __dirname + '/views');//yg
    //app.set('view engine', 'jade'); //yg

//******************************
//* create routes
//******************************

// file upload handling
    app.get('input.txt', function(request, response) {
        response.render('input.txt');
    });
    app.post('/fileload', function(request, response) {
        console.log('in /fileload handler');
        var form = new formidable.IncomingForm();

        form.uploadDir = __dirname + '/test/';

        form.on('file', function(field, file) {
            //rename the incoming file to the file's name
                fs.rename(file.path, form.uploadDir + "/" + file.name);
        });

        form.on('error', function(err) {
            console.log("an error has occured with form upload");
            console.log(err);
            request.resume();
        });

        form.on('aborted', function(err) {
            console.log("user aborted upload");
        });

        form.on('end', function() {
            console.log('-> upload done');
        });

        form.parse(request, function() {
                response.render('photos/new');
        });
    });

// start our server
    app.listen(8888);