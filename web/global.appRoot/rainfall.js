var express = require('express');
var app = express();

var http = require('http');
 
var server = http.createServer(function(req, res) {  
  res.writeHead(200, {'Content-Type': 'text/html'
  });
  res.write('<!doctype html>\n<html lang="en">\n' + 
    '\n<meta charset="utf-8">\n<title>C++ and node.js</title>\n' + 
    '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
    '\n\n<h1>C++ Web App using Node.js NAN </h1>\n' + 
    '<div id="content"><p>Rain Fall Stat Data </p><ul><li>"average" </li><li>"mean"</li><li>"median"</li><li>"standard_deviation"</li></ul></div>' + 
    '\n\n');
  

  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');

var fs = require('fs');
var json = require('json');
readme = fs.readFile('rainfalldata.json','utf8',function(err, data){
//console.log(data)
writeme = fs.writeFile('rainfall.txt', data);
var location1 = data;
console.log(location1)
});

var rainfall = require("./cpp/build/Release/rainfall");
var location = {
    latitude : 40.71, longitude : -74.01,
       samples : [
          { date : "2015-06-07", rainfall : 2.1 },
          { date : "2015-06-14", rainfall : 0.5},
          { date : "2015-06-21", rainfall : 1.5},
          { date : "2015-06-28", rainfall : 1.3},
          { date : "2015-07-05", rainfall : 0.9}
       ] };

// utility printing
var print_rain_results = function(results) {
  var i = 0;
  results.forEach(function(result){
//      console.log("Result for Location " + i);
//      console.log("--------------------------");
//      console.log("\tLatitude:         " + locations[i].latitude.toFixed(2));
//      console.log("\tLongitude:        " + locations[i].longitude.toFixed(2));
//      console.log("\tMean Rainfall:    " + result.mean.toFixed(2) + "cm");
//      console.log("\tMedian Rainfall:  " + result.median.toFixed(2) + "cm");
//      console.log("\tStandard Dev.:    " + result.standard_deviation.toFixed(2) + "cm");
//      console.log("\tNumber Samples:   " + result.n);
//      console.log();
      i++;
  });
}

// Part 1
console.log("Average rain fall = " + rainfall.avg_rainfall(location) + "cm");
// Write 
writeme = fs.writeFile('rainfall1.txt', "Average rain fall = " + rainfall.avg_rainfall(location) + "cm");
  //res.write("Average rain fall = " + rainfall.avg_rainfall(location) + "cm"+ "\n\n");

// Part 2
console.log("Rainfall Data = " + JSON.stringify(rainfall.data_rainfall(location)));

// write
writeme = fs.writeFile('rainfall2.txt', "Rainfall Data = " + JSON.stringify(rainfall.data_rainfall(location, null, 2)));

// Part 3

var makeup = function(max) {
    return Math.round(max * Math.random() * 100)/100;
}

var locations = []
for (var i = 0; i < 10; i++ ) {
    var loc = {
        latitude: makeup(180),
        longitude: makeup(180),
        samples : [
            {date: "2015-07-20", rainfall: makeup(3)},
            {date: "2015-07-21", rainfall: makeup(3)},
            {date: "2015-07-22", rainfall: makeup(3)},
            {date: "2015-07-23", rainfall: makeup(3)}
        ]
    }
    locations.push(loc);
}

var results = rainfall.calculate_results(locations);
print_rain_results(results);


// Part 4 - calling asynchronous c++ addon
rainfall.calculate_results_async(locations, 
  function(err, result) {
    if (err ) {
      console.log(err);
    }
    else {
      print_rain_results(result);
    }
    
  });

//console.log("Async results probably still not here yet...")
writeme = fs.writeFile('rainfall3.txt', JSON.stringify(results));

  res.write("Average rain fall = " + rainfall.avg_rainfall(location) + "cm"+"<br>");
  res.write("<br>");

  res.write("Rainfall Data = " + JSON.stringify(rainfall.data_rainfall(location, null, 2)));
  res.end();
}).listen(5000)//;
//.listen(process.env.PORT || 5000, function () {  
// console.log("Listening on " + port);
//});

//server.listen(process.env.PORT || 3000, function(){
//  console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
//});
//http.listen(process.env.PORT || 3000, function(){
//  console.log('listening on', http.address().port);
//});

//.listen(5000)

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});

//server.listen(3000, '127.0.0.1');
//console.log('Server running at http://127.0.0.1:3000');