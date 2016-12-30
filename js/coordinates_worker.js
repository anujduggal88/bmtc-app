var returnString = '';

// GET COORDINATES FOR USER JOURNEY:
function getGPSCoordinates(busStop){

	// LOCAL STORAGE VARIABLES:
	console.log('Fetching GPS Coordinates for: ' + busStop);

	// GENERATING API CALL URL:
	url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+busStop + " Bus Stop";

	// MAKING SYNC CALL USING XMLHTTPREQUEST:
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);//false - to make sync call
  xhr.onload = function() {
      if (xhr.status === 200) {
          processCoordinatesData(JSON.parse(xhr.responseText));
      }
      else {
          console.log('Request failed.  Returned status of ' + xhr.status);
      }
  };
  xhr.send();
}

// PROCESS COORDINATES DATA:
function processCoordinatesData(parsedCoordinatesData){
  returnString = returnString + parsedCoordinatesData.results[0].geometry.location.lat + ',' + parsedCoordinatesData.results[0].geometry.location.lng + ';'
}

// RECEIVE DATA FROM user_journey.html:
self.addEventListener("message", function(e) {

  //console.log('Logging User Journey: ' + e.data);
  var userJourney = e.data;
  var busStops = userJourney.split(',');

  // LOOP OVER USER JOURNEY:
  for (var i = 0; i < busStops.length ; i++){
  	getGPSCoordinates(busStops[i]);
  }

  // RETURN THE STRING WITH COORDINATES(LAT, LON) OF EACH STOP ON USER JOURNEY:
  postMessage(returnString);
}, false);
