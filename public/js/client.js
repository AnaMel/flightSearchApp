// Create object to contain variables and functions
const userInput = {};

// Function to retrieve input values
userInput.retrieveInputValues = function() {
    userInput.origin=$('input[name=origin]').val();
    userInput.destination=$('input[name=destination]').val();
    // Once retrived call the api endpoint
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

// Function to display returned results
userInput.displayOptions = (flights, origin, destination) => {
    // Clean .results container before displaying the results
    $('.results').html('');

    // If no results are returned display error message
    if (flights.length < 1) {
        const errorMessageContent = `No flights found for ${origin} --> ${destination}`;
        $('.results').append(`<p>${errorMessageContent}</p>`);
    }
    // If results are returned display them on the page
    else {
        console.log(flights.length);
        for (i = 0; i < flights.length; i++) {
            const origin = $('<p>').text(`${flights[i].Origin} -->`);
            const destination = $('<p>').text(flights[i].Destination);
            const departureTime = $('<p>').text(`(${flights[i]["Departure Time"]} -->`);
            const destinationTime = $('<p>').text(`${flights[i]["Destination Time"]})`);
            const price = $('<p>').text(flights[i].Price);
            const optionsContainer = $(`<div>`).append(origin,destination,departureTime,destinationTime,price);
            $('.results').append(optionsContainer);
            // {Origin} --> {Destination} ({Departure Time} --> {Destination Time}) - {Price}
        }
    }
}

// When document is ready..
$(function () {
    // Add event listener on the .search button
    $(".search").on("click", function() {userInput.retrieveInputValues()});
});
