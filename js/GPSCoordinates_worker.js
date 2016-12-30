// var returnString = '';
// var busStops = [];
//
// // Anonymous "self-invoking" function
// (function() {
//
//
//     // Load the script
//     // var script = document.createElement("SCRIPT");
//     // script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
//     // script.type = 'text/javascript';
//     // document.getElementsByTagName("head")[0].appendChild(script);
//
//     // Poll for jQuery to come into existance
//     var checkReady = function(callback) {
//         if (window.jQuery) {
//             callback(jQuery);
//         }
//         else {
//             setTimeout(function() { checkReady(callback); }, 0);
//         }
//     };
//
//     // Start polling...
//     checkReady(function($) {
//         $(function() {
//           self.addEventListener("message", function(e) {
//             console.log('I reached here');
//             var userJourney = e.data;
//             busStops = userJourney.split(',');
//             console.log(busStops);
//             //
//             // // LOOP OVER USER JOURNEY:
//             // for (var i = 0; i < busStops.length ; i++){
//             //   // GET LOCAL STORAGE:
//             //   getGPSCoordinates(busStops[i]);
//             // }
//             //
//             // // RETURN THE STRING WITH COORDINATES(LAT, LON) OF EACH STOP ON USER JOURNEY:
//             // console.log(returnString);
//             // return returnString;
//           }, false);
//
//           console.log('hahahaha');
//           console.log(busStops);
//
//         	// GET THE COORDINATES:
//           for (var i = 0; i < busStops.length ; i++){
//             // GET LOCAL STORAGE:
//             getGPSCoordinates(busStops[i]);
//           }
//           // getGPSCoordinates('Tin Factory Bus Stop');
// 					// getGPSCoordinates('Marathahalli Bus Stop');
//           console.log("Logging return string: " + returnString);
//         });
//     });
//
// })();
//
// // GET COORDINATES FOR USER JOURNEY:
// function getGPSCoordinates(busStop){
//
// 	console.log('Fetching GPS Coordinates for: ' + busStop);
//
// 	// GENERATING API CALL URL:
// 	url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+busStop + " Bus Stop";
//
// 	// MAKING SYNC CALL:
// 	$.ajax({
//   	url: url,
//   	method: 'GET',
//   	async: false,
//   	success: function (response) {
//   		processCoordinatesData(response);
//   	},
//   	error: function(err) {
//   		console.log('[JSON] Error in receiving JSON Data: ' + err.message);
//   	}
// 	})
// }
//
// // PROCESS COORDINATES DATA:
// function processCoordinatesData(parsedCoordinatesData){
//   returnString = returnString + parsedCoordinatesData.results[0].geometry.location.lat + ',' + parsedCoordinatesData.results[0].geometry.location.lng + ';'
// }
//













// BACKUP ----------------------------------------


var returnString = '';
console.log('yahan to aaya');

// INIT VARIABLES:
self.addEventListener("message", function(e) {

  console.log('came here');
  var userJourney = e.data;
  var busStops = userJourney.split(',');

  // LOOP OVER USER JOURNEY:
  for (var i = 0; i < busStops.length ; i++){
  	// GET LOCAL STORAGE:
  	getGPSCoordinates(busStops[i]);
  }

  // RETURN THE STRING WITH COORDINATES(LAT, LON) OF EACH STOP ON USER JOURNEY:
  return returnString;
}, false);

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
