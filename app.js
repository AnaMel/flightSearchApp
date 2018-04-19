var express = require("express");
var app = express();
var port = 3000;
var fs = require("fs");
var path = require('path');

app.use(express.static(__dirname + '/public'));
// Serve CSS & JS file
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/index.html"));
});

var json = [];    
function readFile(path) {
    var f = fs.readFileSync(path, {encoding: 'utf-8'}, function(err){console.log(err);});
    f = f.split("\n");
    // Get first row for column headers
    headers = f.shift().split(",");
    f.forEach(function(d){
        tmp = {}
        row = d.split(",")
        for(var i = 0; i < headers.length; i++){
            upd = row[i].replace(/['"]+/g, '');
            tmp[headers[i]] = upd;
        }
        // Add object to list
        json.push(tmp);
    });
}

readFile('./file1.txt');
readFile('./file2.txt');
// readFile('./file3.txt');


// // Read input file1
// var f = fs.readFileSync('./file1.txt', {encoding: 'utf-8'}, function(err){console.log(err);});
// // Split on row
// f = f.split("\n");
// // Get first row for column headers
// headers = f.shift().split(",");
// var json = [];    
// f.forEach(function(d){
//     tmp = {}
//     row = d.split(",")
//     for(var i = 0; i < headers.length; i++){
//         upd = row[i].replace(/['"]+/g, '');
//         tmp[headers[i]] = upd;
//     }
//     // Add object to list
//     json.push(tmp);
// });

// // Read input file 2
// var file2 = fs.readFileSync('./file2.txt', {encoding: 'utf-8'}, function(err){console.log(err);});
// // Split on row
// file2 = file2.split("\n");
// // Get first row for column headers
// headers = file2.shift().split(",");
// var json2 = [];    
// file2.forEach(function(d){
//     tmp = {}
//     row = d.split(",")
//     for(var i = 0; i < headers.length; i++){
//         upd = row[i].replace(/['"]+/g, '');
//         tmp[headers[i]] = upd;
//     }
//     // Add object to list
//     json2.push(tmp);
// });

// // Read input file3
// var file3 = fs.readFileSync('./file3.txt', {encoding: 'utf-8'}, function(err){console.log(err);});
// // Split on row
// file3 = file3.split("\n");
// // Get first row for column headers
// headers = file3.shift().split("|");
// var json3 = [];    
// file3.forEach(function(d){
//     tmp = {}
//     row = d.split("|")
//     for(var i = 0; i < headers.length; i++){
//         upd = row[i].replace(/['"]+/g, '');
//         tmp[headers[i]] = upd;
//     }
//     // Add object to list
//     json3.push(tmp);
// });

// Merge objects of flight options
let result = json;
console.log(result);
// let result = (json.concat(json2)).concat(json3);

// Replace "-" with "/" in Departure and Destination Time properties
result.map(function(obj){
    obj["Departure Time"] = obj["Departure Time"].replace(/-/g, '/');
    obj["Destination Time"] = obj["Destination Time"].replace(/-/g, '/');
})




// array.sort((x,y) => {
//     var xInt = new Number(x.Registration_Number.substring(1,x.length));
//     var yInt = new Number(y.Registration_Number.substring(1,x.length)); 
//     return xInt - yInt;
//    });

   

// Create /searchFlights endpoint
app.get("/searchFlights/:origin/:destination", (req, res) => {
    var flights =[];
    result.map(function(obj){
        if(obj["Origin"] === req.params.origin && obj["Destination"] === req.params.destination) {
            flights.push(obj);
        }
    })
    flights.sort(function (a, b) {
        return a.Price.substr(1) - b.Price.substr(1) 
    });
    flights = flights.filter((flight, index, self) => index === self.findIndex((t) => (
        t.Origin === flight.Origin && t.Destination === flight.Destination && t.Price === flight.Price && t["Departure Time"] === flight["Departure Time"]&& t["Destination Time"] === flight["Destination Time"]
    )))
    res.send({
        flights
    });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});