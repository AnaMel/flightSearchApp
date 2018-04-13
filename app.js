var express = require("express");
var app = express();
var port = 3000;
var fs = require("fs");
var path = require('path');

// var path = require("path");
app.use(express.static(__dirname + '/public'));
// app.use("/scripts",  express.static(path.join(__dirname, '/public')));


app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/index.html"));
});


// Read input file
var f = fs.readFileSync('./file1.txt', {encoding: 'utf-8'}, 
function(err){console.log(err);});

// Split on row
f = f.split("\n");
// console.log(f);

// Get first row for column headers
headers = f.shift().split(",");

var json = [];    
f.forEach(function(d){
    // Loop through each row
    tmp = {}
    row = d.split(",")
    // console.log(row);
    
    for(var i = 0; i < headers.length; i++){
        upd = row[i].replace(/['"]+/g, '');
        tmp[headers[i]] = upd;
    }
    // Add object to list
    json.push(tmp);
});


// data = JSON.stringify(json);
// console.log(data);

app.get("/searchFlights/:origin/:destination", (req, res) => {
    json.map(function(obj){
        if(obj["Origin"] === req.params.origin && obj["Destination"] === req.params.destination) {
            res.send({
                Origin: obj["Origin"],
                Destination: obj["Destination"],
                DepartureTime: obj["Departure Time"],
                DestinationTime: obj["Destination Time"],
                Price: obj["Price"],
                status: 200
                // {Origin} --> {Destination} ({Departure Time} --> {Destination Time}) - {Price}
            });
        }
        // Add support for no match


        // Object.keys(obj).forEach(function(key) {
        //     if (obj[key] === req.params.origin){

        //     }
        //     var val = obj[key];
        //     logic();
        //   });




    })
    // res.send({
    //     status: 200
    // });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});