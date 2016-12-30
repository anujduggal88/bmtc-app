// importScripts('https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');

var returnString = '';
var theNewScript = document.createElement("script");
theNewScript.type = "text/javascript";
//theNewScript.src = "http://example.com/jquery.js";
theNewScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
document.getElementsByTagName("head")[0].appendChild(theNewScript);
// jQuery MAY OR MAY NOT be loaded at this stage
var waitForLoad = function () {
    if (typeof jQuery != "undefined") {
        //$.get("myfile.php");
        console.log('Before');
        getGPSCoordinates('Tin Factory Bus Stop');
        console.log('After');
    } else {
        window.setTimeout(waitForLoad, 1000);
    }
};
window.setTimeout(waitForLoad, 1000);



// GET COORDINATES FOR USER JOURNEY:
function getGPSCoordinates(busStop){

	// LOCAL STORAGE VARIABLES:
	console.log('Fetching GPS Coordinates for: ' + busStop);

	// GENERATING API CALL URL:
	url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+busStop + " Bus Stop";

	// MAKING SYNC CALL:
	$.ajax({
  	url: url,
  	method: 'GET',
  	async: false,
  	success: function (response) {
  		processCoordinatesData(response);
  	},
  	error: function(err) {
  		console.log('[JSON] Error in receiving JSON Data: ' + err.message);
  	}
	})
}

// PROCESS COORDINATES DATA:
function processCoordinatesData(parsedCoordinatesData){

	console.log('[PARSING] Parsing fetched Coordinates data ..');
  returnString = returnString + parsedCoordinatesData.results[0].geometry.location.lat + ',' + parsedCoordinatesData.results[0].geometry.location.lng + ';'
  console.log("Logging return string: " + returnString);
}
