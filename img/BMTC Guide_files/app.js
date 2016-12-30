// GLOBAL VARIABLES:
var url = 'http://localhost:8080/route4';
var routeList=[];
var routeDetails = [];
var routeList_partial = [];
var userJourney = [];
var busJourney = [];
var coordinates = [];

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

// GET JSON DATA AND PROCESS IT:
function getDataFromAPI(url){

	// SHOW SPINNER
	spinnerElement.classList.add('is-active');

	fetch(url)
		.then(function(response){
			return response.json();
		})
		.then(function(parsedJSON){
			console.log('[FETCH] Fetching data from ', url);
			console.log('[FETCH] Parsed JSON: ', parsedJSON);
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

// SUBMIT BUTTON HANDLER:
// 1. VALIDATES AND CHECKS USER INPUT
// 2. LOADS THE JSON DATA RECEIVED FROM WEB API
function btn_GuideMe(){

	// INIT VARIABLES:
	initializeVariables();

	// VALIDATE USER INPUT:
	if(userSelectedSource === ''  ||  userSelectedDestination === ''){

		console.warn('[USER INPUT] Not sufficient Input');
		alert('Please enter valid input for Source and Destination');
		return;
	}

	url = 'http://bbus-in.herokuapp.com/api/v1/search/?from='+userSelectedSource+'&to='+userSelectedDestination+'&how=Direct%20Routes%20Only';

	console.log('Fetching from bbus API: ', url);

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
