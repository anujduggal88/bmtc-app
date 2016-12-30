// GLOBAL VARIABLES:
var url = 'http://localhost:8080/route4';
var routeList=[];
var routeDetails = [];
var routeList_partial = [];
var userJourney = [];
var busJourney = [];
var coordinates = [];
var isValidated = 0; // INIT TO FALSE
var title = 'BMTC Guide';

var spinnerElement = document.querySelector('.mdl-spinner');

// MAPPINGS:
var apiMap = {};


// MAPPINGS:
var Map = {};

// ROUTE 1: KBS - 1ST BLOCK KORAMANGALA
Map['171-C'] = 19131;
Map['171-F'] = 22499;
Map['171-J'] = 29595;

// ROUTE 2: CENTRAL SILK BOARD - ELECTRONIC CITY
Map['600-CH'] = 19570;
Map['600-F'] = 19701;
Map['CJP-ELCW'] = 32003;
Map['MEBP-ELC'] = 18367;

// ROUTE 3: CENTRAL SILK BOARD - MARATHAHALLI BRIDGE
Map['411-B'] = 7071;
Map['500-A'] = 7362;
Map['BSK-D10G'] = 8442;
Map['CSB-KDG'] = 10712;

// ROUTE 4: TIN FACTORY - MARATHAHALLI BRIDGE
Map['500-G'] = 2527;
Map['411-B'] = 7072;
Map['500-A'] = 7364;
Map['504'] = 8092;

// GET ELEMENTS
var txt_source = document.getElementById('txt_source');
var txt_destination = document.getElementById('txt_destination');
var txt_routeno = document.getElementById('txt_routeno');
var ddl_source = document.getElementById('ddl_source');
var ddl_destination = document.getElementById('ddl_destination');
var userSelectedSource;
var userSelectedDestination;

(function () {

	// 'use strict';
	//
  // var headerElement = document.querySelector('.header');
  // var metaTagTheme = document.querySelector('meta[name=theme-color]');
	//
  // //After DOM Loaded
  // document.addEventListener('DOMContentLoaded', function(event) {
  //   //On initial load to check connectivity
  //   if (!navigator.onLine) {
  //     updateNetworkStatus();
  //   }
	//
  //   window.addEventListener('online', updateNetworkStatus, false);
  //   window.addEventListener('offline', updateNetworkStatus, false);
  // });
	//
  // //To update network status
  // function updateNetworkStatus() {
  //   if (navigator.onLine) {
  //     metaTagTheme.setAttribute('content', '#0288d1');
  //     headerElement.classList.remove('app__offline');
  //   }
  //   else {
  //     toast('App is offline');
  //     metaTagTheme.setAttribute('content', '#6b6b6b');
  //     headerElement.classList.add('app__offline');
  //   }
  // }




	var headerElement = document.querySelector('.header');

	//Once the DOM is loaded, check for connectivity
	document.addEventListener('DOMContentLoaded', function(event) {
		if (!navigator.onLine) {
			goOffline();
		}

		//Offline event listener
		window.addEventListener("offline", function () {
			goOffline();
		});

		//Online event listener
		window.addEventListener("online", function () {
			goOnline()
		});
	});

	function goOffline() {
		toast('App is offline');
		headerElement.style.background = '#9E9E9E';
		menuHeaderElement.style.background = '#9E9E9E';
	}

	function goOnline() {
		headerElement.style.background = '';
		menuHeaderElement.style.background = '';
	}
})();

// GET JSON DATA AND PROCESS IT:
function getDataFromAPI(url){

	// SHOW SPINNER
	spinnerElement.classList.add('is-active');

	// Enabling cors is needed while fetching from server:
	fetch(url,
		{
			mode: 'cors',
			headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=utf-8",
				"Accept" : "application/json"
			}
		}
	)
		.then(function(response){
			return response.json();
		})
		.then(function(parsedJSON){
			console.log('[FETCH] Fetching bus route information');
			//console.log('[FETCH] Parsed JSON: ', parsedJSON);
		 	processJSONData(parsedJSON);

			// HIDE SPINNER
			spinnerElement.classList.remove('is-active');
		})
		.catch(function(err){
			console.warn('[FETCH] Parsing Failed: ' + err.message);
			alert('There exist no direct bus on this route');

			// HIDE SPINNER
			spinnerElement.classList.remove('is-active');
		});
}

function alertUser(title, message){
	bootbox.alert({
		size: "small",
		title: title,
		message: message,
		callback: function(){ /* your callback code */ }
	});
}

// PROCESS JSON DATA RECEIVED:
function processJSONData(jsonDataFromAPI){

	var __durationOfJourney = '';
	// INITIALIZE routeList[] WITH JSON DATA:
	for (var i=0;i<jsonDataFromAPI.route1.length;i++){
		routeList.push(jsonDataFromAPI.route1[i]['Route No']);
		apiMap[jsonDataFromAPI.route1[i]['Route No']] = jsonDataFromAPI.route1[i]['Route/Important Stops'];
		localStorage[jsonDataFromAPI.route1[i]['Route No']] = jsonDataFromAPI.route1[i]['Route/Important Stops'];
		__durationOfJourney = "durationOfJourney_" + jsonDataFromAPI.route1[i]['Route No'];
		localStorage[__durationOfJourney] = jsonDataFromAPI.route1[i]['duration'];
	}

	// GET NUMBER OF BUS STOPS FOR EACH BUS NUMBER:
	for (var i=0; i<routeList.length; i++){
		processJSONDataBusJourney_updated(routeList[i].toString(), localStorage[routeList[i]].toString());
	}

	// LOG routeList[]
	// console.info('[INIT] Logging list of available routes:');
	// console.log(routeList);

	// INITIALIZE LOCAL VARIABLES:
	localStorage["routeno"] = routeList;
		// localStorage["userSource"] = userSelectedSource;
		// localStorage["userDestination"] = userSelectedDestination;

	// REDIRECT THE USER TO NEXT PAGE:
	console.info('[NAVIGATE] Navigating to bus_routes.html');
	window.location.href="bus_routes.html";
}

// INITIALIZE THE VARIABLES WITH USER INPUT:
function initializeVariables(){
	userSelectedSource = txt_source.value;//ddl_source.options[ddl_source.selectedIndex].value;
	userSelectedDestination = txt_destination.value;//ddl_destination.options[ddl_destination.selectedIndex].value;
	localStorage["userSource"] = userSelectedSource;
	localStorage["userDestination"] = userSelectedDestination;
}

// SWAP TEXT OF USER SOURCE AND DESTINATION:
function swapText(){
	if(document.getElementById('txt_source').value != '' || document.getElementById('txt_destination').value != ''){

		// SWAP THE USER SOURCE AND DESTINATION:
		console.info('[SWAP] Swapping User Source and Destination...');

		// SWAP LOGIC:
		var temp = document.getElementById('txt_source').value;
		document.getElementById('txt_source').value = document.getElementById('txt_destination').value;
		document.getElementById('txt_destination').value = temp;
	}
	else {
		// ALERT THE USER THAT THERE IS NO TEXT ENTERED TO SWAP IN EITHER OF SOURCE OR DESTINATION:
		alert('Nothing to Swap');
	}
}

// VALIDATE USER INPUT:
function validateUserInput(){

	// RETURN FALSE (0) OR SUCCESS (1) BASED ON THE VALIDATION RULES

	if(userSelectedSource === ''  &&  userSelectedDestination === ''){
		alert('Please enter valid source and destination');
		//txt_source.style.borderColor = 'red';
		//txt_destination.style.borderColor = 'red';
		txt_source.focus();
		return 0;
	}

	if(userSelectedSource === ''){
		alert('Please enter valid source.');
		//txt_source.style.borderColor = 'red';
		txt_source.focus();
		return 0;
	}

	if(userSelectedDestination === ''){
		alert('Please enter valid Destination.');
		//txt_destination.style.borderColor = 'red';
		txt_destination.focus();
		return 0;
	}

	return 1; // RETURN SUCCESS. USER INPUT VALIDATED SUCCESSFULLY
}

// START HERE:
function btn_GuideMe(){

	// INITIALIZE VARIABLES WITH USER'S INPUT:
	initializeVariables();

	// RETURN IF THE USER INPUT VALIDATES TO FALSE:
	if(!validateUserInput()){
		return;
	}

	// DEPRECATED:
	//url = 'https://bbus-in.herokuapp.com/api/v1/search/?from='+userSelectedSource+'&to='+userSelectedDestination+'&how=Direct%20Routes%20Only';

	// USE THIS: BYPASSING CORS USING PROXY SERVER:
	var bypass_proxy = 'https://cors-anywhere.herokuapp.com/';
	url = bypass_proxy+'https://bbus-in.herokuapp.com/api/v1/search/?from='+userSelectedSource+'&to='+userSelectedDestination+'&how=Direct%20Routes%20Only';

	// GET JSON, PROCESS IT, INIT routeList[], NAVIGATE TO NEXT PAGE:
	getDataFromAPI(url);
}

// INIT ARRAY OF USER JOURNEY (SUBSET OF BUS STOPS ON THE ROUTE):
function init_sub_array(busJourney, start, end){

	var indexOfSubArray = 0;
	var sub_array = [];

	// FLAG TO INDICATE WHEN TO START WRITING IN sub_array[]:
	var now_write = false;

	for (var indexOfBusJourney = 0; indexOfBusJourney < busJourney.length; indexOfBusJourney++) {

		// START WRITING INTO sub_array[] FROM USER's BOARDING LOCATION:
		if(busJourney[indexOfBusJourney].toString() === start.toString()){
			sub_array[indexOfSubArray] = busJourney[indexOfBusJourney];
			indexOfSubArray++;
			now_write = true;
			continue;
		}

		// Write the sub_array with Bus Stops between User's BOARDING and
		// DE-BOARDING locations:
		if(now_write){
			sub_array[indexOfSubArray] = busJourney[indexOfBusJourney];
			indexOfSubArray++;
		}

		// End sub_array from User's DE-BOARDING location:
		if(busJourney[indexOfBusJourney].toString() === end.toString()){
			break;
		}
	}

	return sub_array;
}


function fetchCoordinates(sub_array){

	// FETCH THE DATA FROM API:
	url = 'http://localhost:8080/stop';

	console.log("[FETCH] Fetching Coordinates");


		console.log("[FETCH] Fetching from -->> ", url);


		$.ajax({
		url: url,
		method: 'GET',
		success: function (response) {
			processJSONDataWithCoordinates(response);
		},
		error: function(err) {
			console.log('[JSON] Error in receiving JSON Data: ' + err.message);
		}
	})
}

function processJSONDataWithCoordinates(jsonDataFromAPI){

	// // SCAN THROUGH THE sub_array AND GET COORDINATES:
	// for(var i=0; i<sub_array.length; i++){
	// 	for(var j=0; j<jsonDataFromAPI.length;j++){
	// 		if(jsonDataFromAPI.)
	// 			console.log();
	// 	}
	// }

	console.log('LOGGING:');
	// INITIALIZE routeList[] WITH JSON DATA:
	for (var i=0;i<jsonDataFromAPI.length;i++){
		console.log(jsonDataFromAPI[i]['stop_lat']);
		console.log(jsonDataFromAPI[i]['stop_lon']);
	}
}

// USER JOURNEY:
// 1. OBTAIN THE userJourney[] FROM busJourney[]
// 2. RETURN ARRAY/SET OF userJourney[]
function getUserJourney(userSelectedRoute, busJourney){

	var numberOfStops = 0;
	var sub_array = []; // ARRAY OF USER JOURNEY: SUBSET OF busJourney[]
	var start = localStorage["userSource"]; // USER BOARDING LOCATION
	var end = localStorage["userDestination"]; // USER DE-BOARDING LOCATION

	// INIT sub_array[] WITH SUBSET OF USER'S JOURNEY:
	sub_array = init_sub_array(busJourney, start, end);

	// LOG USER JOURNEY
	//console.info('[INIT] Logging User Journey: ');
	for(var i = 0; i < sub_array.length ; i++){
		numberOfStops = numberOfStops + 1;
		//console.log(sub_array[i]);
		var str_id = 'str_' + i;
		//addElement('parentID', 'button', str_id, sub_array[i], 'Text');
	}

	var __numberOfStops = "numberOfStops_" + userSelectedRoute;
	localStorage[__numberOfStops] = numberOfStops;
	//coordinates = fetchCoordinates(sub_array);
	return sub_array;
}

function processJSONDataBusJourney_updated(userSelectedRoute, str_userSelectedRoute){

	// LOOP THROUGH THE STRING FROM apiMap and generate busJourney[]:
	busJourney = str_userSelectedRoute.split(',');

	// SINCE THE DATA RECEIVED IS NOT CLEAN, REMOVE LEADING AND TRAILING WHITESPACES:
	for (var i = 0; i < busJourney.length; i++){
			busJourney[i] = busJourney[i].trim();
	}

	// console.log("[INIT] Logging Bus Journey:");
	// for(var i=0; i<busJourney.length; i++){
	// 	console.log(busJourney[i]);
	// }

	userJourney = getUserJourney(userSelectedRoute, busJourney);

	localStorage["userJourney"] = userJourney;

	// NAVIGATE TO user_journey.html:
	console.info('[NAVIGATE] Navigating to user_journey.html')
	window.location.href="user_journey.html";

}

function getBusJourneyDataFromAPI_updated(userSelectedRoute){
	processJSONDataBusJourney_updated(userSelectedRoute, localStorage[userSelectedRoute]);
}

// START USER JOURNEY (ARGUMENT COMING FROM FRONT END):
function btn_startJourney(userSelectedRoute){
	localStorage["userRoute"] = userSelectedRoute;
	getBusJourneyDataFromAPI_updated(userSelectedRoute);
}

// ADD AN ELEMENT TO THE DOCUMENT:
function addElement(parentID, elementTag, elementID, html, text){

	var parentElement = document.getElementById(parentID);
	var newElement = document.createElement(elementTag);
	//var newContent = document.createTextNode(text);

	console.log('parentID: ', parentID);
	console.log('[ADD ELEMENT] Added New Element: ', newElement);

	newElement.setAttribute('id', elementID);
	newElement.innerHTML = html;

	//newElement.appendChild(newContent);

	parentElement.appendChild(newElement);
}


// GET CURRENT POSITION:
function getUserCoordinatesAndMapClosestBusStop(){

	var lat;
	var lon;

	// EARLY CHECK FOR GEOLOCATION SUPPORT BY BROWSER:
  if (!navigator.geolocation){
    console.log('Your browser doesn\'t support Geolocation');
    return;
  }

	navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    lat  = position.coords.latitude;
    lon = position.coords.longitude;

		// GET NEARBY BUS STOP:
		getNearbyBusStop(lat, lon);
  }

  function error() {
    console.log('Unable to retreive your location');
  }

	function getNearbyBusStop(lat, lng){
		var origin = new google.maps.LatLng(lat,lng);

		user_lat = lat;
		user_lon = lng;

		map = new google.maps.Map(document.getElementById('map'), {
			//mapTypeId: google.maps.MapTypeId.HYBRID,
			center: origin,
			zoom: 15
		});

		var request = {
			location: origin,
			radius: 500, //LOOK FOR BUS STOPS IN 500 metres OF RADIUS
			types: ['bus_station'] // LOOK FOR BUS STOPS ONLY
		};
		infowindow = new google.maps.InfoWindow();
		service = new google.maps.places.PlacesService(map);
		service.search(request, callback);
	}

	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {

			// FETCHING NEAREST BUS STOP:
			for (var i = 0; i < results.length; i++) {
				//createMarker(results[i]);
				//console.log(results[i].name);
				//console.log(results[i].geometry.location.lat() + ',' + results[i].geometry.location.lng());

				if ( i == 0){
					minDistance = distance(user_lat, user_lon, results[i].geometry.location.lat(), results[i].geometry.location.lng());
					choosenIndex = i;
				}

				if (distance(user_lat, user_lon, results[i].geometry.location.lat(), results[i].geometry.location.lng()) < minDistance){
						choosenIndex = i;
				}
			}
			console.log(results[choosenIndex].name + ' is the nearest Bus Stop');

			// HIDE SPINNER
			spinnerElement.classList.remove('is-active');
			document.getElementById('txt_source').value = results[choosenIndex].name.split(' ')[0];

			// CHECK WHICH BUS STOP'S COORDINATE IS CLOSER TO THE USER:
			//showNearByBusStop()

		}
	}

	function distance(user_lat, user_lon, dest_lat, dest_lon){

		// CHECK IF THE CONVERSION TO RADIANS IS NOT DEFINED BY THE BROWSER:
		if (typeof(Number.prototype.toRadians) === "undefined") {
			Number.prototype.toRadians = function() {
				return this * Math.PI / 180;
			}
		}

		// CALCULATE THE DISTANCE BETWEEN USER AND DESTINATION:
		var R = 6371e3; // metres
		var userLat = user_lat.toRadians();
		var userLon = user_lon.toRadians();
		var diff_lat = (dest_lat - user_lat).toRadians();
		var diff_lon = (dest_lon - user_lon).toRadians();

		var a = Math.sin(diff_lat/2) * Math.sin(diff_lat/2) +
						Math.cos(userLat) * Math.cos(userLon) *
						Math.sin(diff_lon/2) * Math.sin(diff_lon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var d = R * c;

		return d;
	}

	// PLOT THE PLACES ONTO MAP:
	function createMarker(place) {

		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location
		});
		var content='<strong style="font-size:1.2em">'+place.name+'</strong>'+
								'<br/><strong>Latitude:</strong>'+placeLoc.lat()+
								'<br/><strong>Longitude:</strong>'+placeLoc.lng()+
								'<br/><strong>Type:</strong>'+place.types[0]+
								'<br/><strong>Rating:</strong>'+(place.rating||'n/a');
		var more_content='<img src="http://googleio2009-map.googlecode.com/svn-history/r2/trunk/app/images/loading.gif"/>';

		//make a request for further details
		service.getDetails({reference:place.reference}, function (place, status)
																{
																	if (status == google.maps.places.PlacesServiceStatus.OK)
																	{
																		more_content='<hr/><strong><a href="'+place.url+'" target="details">Details</a>';

																		if(place.website)
																		{
																			more_content+='<br/><br/><strong><a href="'+place.website+'" target="details">'+place.website+'</a>';
																		}
																	}
																});


		google.maps.event.addListener(marker, 'click', function() {

			infowindow.setContent(content+more_content);
			infowindow.open(map, this);
		});
	}

	// INPUT LAT, LON:
	// Google Office: 12.9937109, 77.6606825
	// Parangipalya: 12.908028, 77.649183
	// Bellandur: 12.928928, 77.684063
	google.maps.event.addDomListener(window, 'load', function(){initialize(12.928928, 77.684063);});


}


// FILL THE SOURCE:
function btn_getSource(){
	// TODO:
	// 1. GET USER'S LAT, LON (Google Maps Location API)
	// 2. GET NEARBY BUS STOPS (Google Places API)
	// 3. DISPLAY THE NEAREST BUS STOP

	var latlon;
	var user_lat;
	var user_lon;

	// SHOW SPINNER
	spinnerElement.classList.add('is-active');
	//document.getElementById('lbl_sourceLoading').innerHTML = 'Getting Nearby Bus Stop...';
	document.getElementById('txt_source').value = 'Getting Nearby Bus Stop...';

	// GET USER'S LAT LON AND NEARBY BUS STOPS
	getUserCoordinatesAndMapClosestBusStop();
}











//
// // START NOTIFICATIONS:
// function btn_Notifications(){
// 	console.log('Starting Notification Service...');
//
// 	// TODO:
// 	// 1. GET USER COORDINATES
// 	// 2. HIGHLIGHT IF USER COORDINATES IS NEAR ANY STOP ON USER JOURNEY
//
// 	// GET USER COORDINATES:
// 	//initGeolocation();
//
// 	// TRACK
// 	trackUser();
//
//
// }
//
// function initGeolocation() {
// 	if (navigator && navigator.geolocation) {
// 		// GEOLOCAION SUPPORTED:
// 		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
// 	} else {
// 		// GEOLOCATION IS NOT SUPPORTED:
// 		console.log('Geolocation is not supported');
// 	}
// }
//
// function trackUser(){
// 	if (navigator && navigator.geolocation) {
// 		// TRACK USER'S LOCATION AND LOG CURRENT POSITION:
// 		navigator.geolocation.watchPosition(function(position) {
// 			console.log(position.coords.latitude);
// 			console.log(position.coords.longitude);
// 		});
// 	} else {
// 		// GEOLOCATION IS NOT SUPPORTED:
// 		console.log('Geolocation is not supported');
// 	}
// }
//
// function errorCallback() {}
//
// function successCallback(position) {
// 	// CHECK IF THE USER IS IN THE RADIUS OF DESTINATION:
// 	//console.log('Local storage of User Destination: ' + localStorage["userDestination"]);
// 	console.log('Logging User\'s current location: ' + position.coords.latitude, position.coords.longitude);
//
//
//
// 	//getCoordinatesForUserDestination(localStorage["userDestination"]);
// 	//showPushNotification(position.coords.latitude, position.coords.longitude);
// }

function btn_trackUser(){
	window.location.href="trackUser.html";
}
