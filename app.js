var express = require("express");
var app = express();
var port = 3000;
var fs = require("fs");
 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/searchFlights/:origin", (req, res) => {
    res.send({
        status: 200
    });
});

fs.readFile('./file1.txt', 'utf8', function(err,data) {
    if(err) throw err;
    let obj = {};
    let splitted = data.toString().split("\n");
    for (let i = 0; i<splitted.length; i++) {
        let splitLine = splitted[1].split(",");
        console.log(splitLine);
        // obj[splitLine[0]] = obj.splittLine[1].split(" ");
    }
    console.log(obj);
});
 
app.listen(port, () => {
  console.log("Server listening on port " + port);
});