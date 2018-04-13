// Create object to contain variables and functions
const userInput = {};

userInput.retrieveInputValues = function() {
    userInput.origin=$('input[name=origin]').val();
    userInput.destination=$('input[name=destination]').val();
    console.log(userInput.origin,userInput.destination);
    userInput.getFlights(userInput.origin,userInput.destination);
}


// Create AJAX request to /searchFlights endpoint
userInput.getFlights = function(origin, destination){

    return $.ajax({
        url: `http://localhost:3000/searchFlights/${origin}/${destination}`,
        method: 'GET',
        dataType: 'json',
    })
    .then(function (res) {
        console.log('parsed json: ', res);
        userInput.displayOptions(res.flights, origin, destination);
    });
};

userInput.displayOptions = (flights, origin, destination) => {
    console.log(flights);
    $('.results').html('');
    flights.sort(function (a, b) {
        return a.Price.substr(1) - b.Price.substr(1)
    });
    // If no results are returned display error message
    if (flights.length < 1) {
        const errorMessageContent = `No flights found for ${origin} --> ${destination}`;
        $('.results').append(`<p>${errorMessageContent}</p>`);
    }
    // If results are returned display them on the page
    else {
        console.log(flights.length);
        for (i = 0; i < flights.length; i++) {
            const origin = $('<p>').text(flights[i].Origin);
            const destination = $('<p>').text(flights[i].Destination);
            const price = $('<p>').text(flights[i].Price);
            const optionsContainer = $(`<div>`).append(origin,destination,price);
            $('.results').append(optionsContainer);
        }
    }
}


// When document is ready..
$(function () {
    console.log('hooray');
    $(".search").on("click", function() {userInput.retrieveInputValues()});
});
