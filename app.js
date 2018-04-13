var express = require("express");
var app = express();
var port = 3000;
var fs = require("fs");
var path = require('path');

app.use(express.static(__dirname + '/public'));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/index.html"));
});


// Read input file
var f = fs.readFileSync('./file1.txt', {encoding: 'utf-8'}, 
function(err){console.log(err);});

// Split on row
f = f.split("\n");

// Get first row for column headers
headers = f.shift().split(",");

var json = [];    
f.forEach(function(d){
    // Loop through each row
    tmp = {}
    row = d.split(",")
    for(var i = 0; i < headers.length; i++){
        upd = row[i].replace(/['"]+/g, '');
        tmp[headers[i]] = upd;
    }
    // Add object to list
    json.push(tmp);
});

app.get("/searchFlights/:origin/:destination", (req, res) => {
    var flights =[];
    json.map(function(obj){
        if(obj["Origin"] === req.params.origin && obj["Destination"] === req.params.destination) {
            flights.push(obj);
        }
        // Add support for no match


        // Object.keys(obj).forEach(function(key) {
        //     if (obj[key] === req.params.origin){

        //     }
        //     var val = obj[key];
        //     logic();
        //   });




    })
    res.send({
        flights
    });
    // res.send({
    //     status: 200
    // });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});