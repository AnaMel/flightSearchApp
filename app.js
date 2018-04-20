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
    f = f.replace(/\|/g, ",").split("\n");
    // Get first row for column headers
    headers = f.shift().split(",");
    f.forEach(function(d){
        tmp = {}
        row = d.split(",");
        for(var i = 0; i < headers.length; i++){
            upd = row[i];
            tmp[headers[i]] = upd;
        }
        // Add object to list
        json.push(tmp);
    });
    // Replace "-" with "/" in Departure and Destination Time properties
    json.map(function(obj){
        obj["Departure Time"] = obj["Departure Time"].replace(/-/g, '/');
        obj["Destination Time"] = obj["Destination Time"].replace(/-/g, '/');
    })
}

readFile('./file1.txt');
readFile('./file2.txt');
readFile('./file3.txt');


// Create /searchFlights endpoint
app.get("/searchFlights/:origin/:destination", (req, res) => {
    var flights =[];
    json.map(function(obj){
        if(obj["Origin"] === req.params.origin && obj["Destination"] === req.params.destination) {
            flights.push(obj);
        }
    })
    flights.sort(function (a, b) {
        return a.Price.substr(1) - b.Price.substr(1) || Date.parse(a["Departure Time"]) - Date.parse(b["Departure Time"])
    });

    // Assign a value of filtered array to the variable "flights"
    flights = 
    // by using .filter method to return a brand new array containing elements which satisfy the conditions on line#67
    flights.filter(
        // provide the following arguments to the callback function
        // current element being processed in the array
        (flight,
            // index of the "flight" element
            index,
                // original flights array
                self) => 
                    // index of the "flight" element equals index of the first element in the original "flights" (self) array that satisfies the condition on line#69 (this will only return first instance of an object and will ignore the remaining duplicate records)
                    index === self.findIndex((t) => (
                        // returns index of the first element in "flights" array which properties equal to property values of the current element being processes (flight) 
                        t.Origin === flight.Origin && t.Destination === flight.Destination && t.Price === flight.Price && t["Departure Time"] === flight["Departure Time"]&& t["Destination Time"] === flight["Destination Time"]
    )))
    res.send({
        flights
    });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});