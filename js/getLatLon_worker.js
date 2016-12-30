var returnString = '';

// RECEIVE DATA FROM CALLING FILE:
self.addEventListener("message", function(e) {

  // POST BACK THE LAT LON OF THE BUS STOP TO THE CALLING FILE:
  postMessage(GPSCoordinates(e.data));

}, false);

// GET LAT LON OF BUS STOP:
function GPSCoordinates(busStop){

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

  return returnString;
}

// PROCESS COORDINATES DATA:
function processCoordinatesData(parsedCoordinatesData){
  returnString = returnString + parsedCoordinatesData.results[0].geometry.location.lat + ',' + parsedCoordinatesData.results[0].geometry.location.lng;
}
