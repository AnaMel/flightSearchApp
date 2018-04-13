// Create object to contain variables and functions
const userInput = {};

// Create AJAX request to Google Maps API 
// to retrieve coordinates based on user's address
userInput.getFlights = function(origin, destination){
    fetch('http://localhost:3000/searchFlights/MIA/ORD')
        .then(function(response) {
            return response.json()
        }).then((json) => {
            console.log('parsed json: ', json);
            // Call displayNotification function once the returned promise is resolved
            // this.displayNotification(json);
        }).catch(function(ex) {
            console.log('parsing failed: ', ex)}
        )
};
// userInput.getFlights('MIA', 'ORD')
// When document is ready..
$(function () {
    console.log('hooray');
    document.getElementsByClassName('search').addEventListener("click", console.log("success"));
});
