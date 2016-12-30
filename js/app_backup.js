// GLOBAL VARIABLES:
var url = 'http://localhost:8080/route4';
var routeList=[];
var routeDetails = [];

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

// Get the routes from Web Service:
// function getRoutesNew(url){
// 	var request = new XMLHttpRequest();
// 	request.open("GET", url, false);
// 	request.send(null)
//
// 	// PARSE THE JSON OBJECT:
// 	var my_JSON_object = JSON.parse(request.responseText);
//
// 	// LOOP THROUGH JSON OBJECT FOR ROUTE NUMBERS AND PUSH TO ARRAY:
// 	for (var i=0;i<my_JSON_object.length;i++){
// 		routeList.push(my_JSON_object[i][1]);
// 	}
//
// 	return (routeList);
//
// }



function getDataFromAPI(url){


	fetch(url, {
								method: 'GET',
								mode: 'no-cors'
							})
 .then(function(response){
	 console.log('===============');
	 console.log(response.clone().json());
	 return response.json();
	 //processJSONData(response.json());
	 //return response.json();
}).then(function(j) {
processJSONData(j);
// Yay, `j` is a JavaScript object
console.log("hey jjjjjj"+j);
//return j;
});










	//var url = 'http://localhost:8080/route4';

// 	return fetch(url, {
// 											method: 'GET',
// 											mode: 'no-cors'
// 										})
// 		.then(function(response){
// 			if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' +
//           response.status);
//         return;
// 			}
//
// 			//console.log('[APP.JS] Response received from Web Service: ' + response.clone().text());
// 			//return response.json();
// 			response.json().then(function(json){
// 												console.log(json);
// 												// for (var i=0;i<json.length;i++){
// 												// 	console.log(json[i][1]);
// 												// 	routeList.push(json[i][1]);
// 												// }
// 											});
// 		})
// 		.then(function(files){
// 			console.log('[APP.JS] Response is here: ', files.json());
// 			return files.json().then(function(json){
// 												console.log('heheheheheheeheh ;;;;;;;; ');
// 												for (var i=0;i<json.vehicles.length;i++){
// 													console.log(json.vehicles[i][1]);
// 													routeList.push(json.vehicles[i][1]);
// 												}
// 											});
// 			//return cache.addAll([url]);
// 		});
//
//
// 		// return fetch(url)
// 		// 	.then(function(response){
// 		// 		console.log('[APP.JS] Response received from Web Service: ' + response.clone().text());
// 		// 		return response.json();
// 		// 	})
// 		// 	.then(function(files){
// 		// 		console.log('[APP.JS] Response is here: ', files.json());
// 		// 		//return cache.addAll([url]);
// 		// 	});
// 		//
//
//
// 	// GET THE JSON DATA FROM WEB SERVICE:
// 	// INTERNALLY, SERVICE WORKER DECIDES FROM WHERE THE DATA COMES(WEB/CACHE):
// 	//
// 	// return fetch(url,
// 	// 					{
// 	// 						method: 'GET',
// 	// 						mode: 'no-cors',
// 	// 						headers: new Headers({
// 	// 																 'Content-Type': 'application/json'
// 	// 															   })
// 	// 					})
// 	// 						.then(function(response){
// 	// 							console.log( '[Data] Data loaded as: ' + response.clone());
// 	// 							return response.json();
// 	// 						})
// 	// 						.then(function(resp){
// 	// 							console.log('JSON Response is: ' + resp.clone());
// 	// 							return resp;
// 	// 						})
// 	// 						.catch(function(err){
// 	// 							console.log('[Data]: Failed to load ' + err);
// 	// 						});
}

function processJSONData(jsonDataFromAPI){

	// PROCESS THE JSON OBJECT AND PUT IT IN ARRAY:
	//var my_JSON_object = JSON.parse(jsonDataFromAPI.responseText);
	for (var i=0;i<jsonDataFromAPI.length;i++){
		console.log(jsonDataFromAPI[i][1]);
		routeList.push(jsonDataFromAPI[i][1]);
	}
	return (routeList);
}

// PROCESS THE ROUTE LIST:
function processRouteList(routeList){
	var routeList_partial = [];
	//var routeList_new = [];

	for (var i = 0; i < routeList.length; i++) {
		//alert(routeList[i]);
		routeList_partial.push(routeList[i].split(','));
	}

	return routeList_partial;
}

function initializeVariables(){
	userSelectedSource = ddl_source.options[ddl_source.selectedIndex].value;
	userSelectedDestination = ddl_destination.options[ddl_destination.selectedIndex].value;
}


// SUBMIT BUTTON HANDLER:
function btn_GuideMe(){

	initializeVariables();

	// 1. VALIDATE AND CHECK THE USER INPUT
	// 2. LOAD THE DATA FROM JSON FILE/SERVICE
	// 3. PROCEED TO routes.html

	// VALIDATE USER INPUT:
	if(userSelectedSource === ''  ||  userSelectedDestination === ''){
		alert('User input not sufficient');
		return;
	}

	if(userSelectedSource === 'Kempegowda Bus Station' && userSelectedDestination === '1st Block Koramangala'){
		// Route 1 - Majestic to Koramangala
		url = 'http://localhost:8080/route1';
	}
	else if(userSelectedSource === 'Central Silk Board' && userSelectedDestination === 'Electronic City'){
		// Route 2 - Silk Board to Electronic City
		url = 'http://localhost:8080/route2';
	}
	else if(userSelectedSource === 'Central Silk Board' && userSelectedDestination === 'Marathahalli Bridge'){
		// Route 3 - Silk Board to Marathahalli
		url = 'http://localhost:8080/route3';
	}
	else if(userSelectedSource === 'Tin Factory' && userSelectedDestination === 'Marathahalli Bridge'){
		// Route 4 - Tin Factory to Marathahalli
		url = 'http://localhost:8080/route4';
	}
	else {
		// Route doesn't exist for the User's input
		alert('Invalid Input');
		return;
	}

	// GET THE ROUTES IN ARRAY routeList[]:
	//routeList = getRoutesNew(url);
	var jsonDataFromAPI = getDataFromAPI(url);

	routeList = processJSONData(jsonDataFromAPI);

	// PROCESS ARRAY:
	routeList_partial = processRouteList(routeList);

	// Put route numbers in Local Variable:
	localStorage["routeno"] = routeList_partial;

	// Put User Journey information in Local Storage:
	localStorage["userSource"] = userSelectedSource;//txt_source.value;
	localStorage["userDestination"] = userSelectedDestination;//txt_destination.value;

	// Refresh the window:
	window.location.href="routes.html";
}

function init_sub_array(busJourney, start, end){

	var j = 0;
	var sub_array = [];
	var now_write = false;

	for (var i = 0; i < busJourney.length; i++) {

		// Start sub_array from User's BOARDING Location
		if(busJourney[i] == start){
			sub_array[j] = busJourney[i];
			j++;
			now_write = true;
			continue;
		}

		// Write the sub_array with Bus Stops between User's BOARDING and
		// DE-BOARDING locations
		if(now_write){
			sub_array[j] = busJourney[i];
			j++;
		}

		// End sub_array from User's DE-BOARDING location
		if(busJourney[i] == end){
			break;
		}
	}
	return sub_array;
}

function getUserJourney(busJourney){

	// 1. ALGO TO OBTAIN THE USER JOURNEY SET FROM BUS JOURNEY SET
	// 2. RETURN ARRAY/SET OF USER JOURNEY

	// busJourney IS ARRAY OF BUS STOPS (BUS JOURNEY) OF A ROUTE
	var sub_array = []; // ARRAY OF USER JOURNEY
	var start = localStorage["userSource"]; // USER BOARDING STOP
	var end = localStorage["userDestination"]; // USER DE-BOARDING STOP

	sub_array = init_sub_array(busJourney, start, end);

	// LOG USER JOURNEY
	console.log('[USER JOURNEY] Logging User Journey Details: ');
	for(var i = 0; i < sub_array.length ; i++){
		console.log(sub_array[i]);
	}
	return sub_array;
}

// function getBusJourney(url){
//
// 	// 1. MAKE A CALL TO WEB SERVICE
// 	// 2. RETURN THE ARRAY/SET OF BUS STOPS ON THE BUS ROUTE
//
// 	var request = new XMLHttpRequest();
// 	request.open("GET", url, false);
// 	request.send(null)
//
// 	// PARSE THE JSON OBJECT:
// 	var my_JSON_object = JSON.parse(request.responseText);
//
// 	// LOOP THROUGH JSON OBJECT FOR BUS STOPS ON ROUTE SELECTED:
// 	for (var i=0;i<my_JSON_object[0][7].length;i++){
// 		routeDetails.push(my_JSON_object[0][7][i].start_bus_stop_name);
// 	}
//
// 	// LOG BUS JOURNEY
// 	console.log('[BUS JOURNEY] Logging Bus Journey Details: ');
// 	for(var i = 0 ; i < routeDetails.length ; i++){
// 		console.log(routeDetails[i]);
// 	}
// 	return (routeDetails);
// }

function processJSONDataBusJourney(jsonDataFromAPI){
	// LOOP THROUGH JSON OBJECT FOR BUS STOPS ON ROUTE SELECTED:
	for (var i=0;i<my_JSON_object[0][7].length;i++){
		routeDetails.push(jsonDataFromAPI[0][7][i].start_bus_stop_name);
	}
	return(routeDetails);
}


// FROM routes.html to user_journey.html
function btn_startJourney(){

	// CHECK CORNER CASES:
	// 1. CHECK IF USER HAS NOT ENTERED ANY ROUTE
	if(txt_routeno.value === ''){
		alert('Oops! You have not selected any Bus Route');
		return;
	}

	// CHECK IF THE SELECTION BELONGS TO THE BUS ROUTE
	// APPEND THE ROUTE ID TO THE URL FOR FURTHER PROCESSING
	if( localStorage["routeno"].indexOf(txt_routeno.value) > -1 ){
		url = 'http://localhost:8080/route/' + Map[txt_routeno.value];
	}
	else {
		alert('Oops! Bus Route does not exist on your Journey');
		return;
	}

	// TODO:
	// 1. CALL WEB SERVCIE WITH ABOVE URL TO OBTAIN BUS ROUTE JOURNEY
	var jsonDataFromAPI = getDataFromAPI(url);

	busJourney = processJSONDataBusJourney(jsonDataFromAPI);

	// 2. DISPLAY THE SUBSET (USER JOURNEY) FROM THE BUS JOURNEY
	userJourney = getUserJourney(busJourney);

	localStorage["userRoute"] = txt_routeno.value;
	localStorage["userJourney"] = userJourney;

	window.location.href="user_journey.html";
}
