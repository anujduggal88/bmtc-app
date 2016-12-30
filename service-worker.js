'use strict'

// ADD CACHE POLYFILL TO SUPPORT CACHE API IN ALL BROWSERS
importScripts('./cache-polyfill.js');

// CACHE NAME:
var cache_name = 'cache_bmtc_v1';

// TODO: ADD RELEVANT FILES TO THE FOLLOWING ARRAY, TO BE LOADED IN CACHE:
var filesToCache = [
	'/',
	'./index.html',
	'./bus_routes.html',
	'./user_journey.html',
	'./css/',
	'./css/material_icons_stylesheet.css',
	'./css/material.css',
	'./css/material.min.css',
	'./css/material.min.css.map',
	'./css/style.css',
	'./css/stylesheet.css',
	'./js/',
	'./js/app.js',
	'./js/jquery.js',
	'./js/material.js',
	'./js/material.min.js',
	'./js/material.min.js.map'
];

// INSTALL:
self.addEventListener('install', function(event){

	event.waitUntil(

		// LOAD CACHE WITH APP SHELL (MINIMAL HTML, CSS, JS)
		caches.open(cache_name).then(function(cache){

			// ADD FILES TO CACHE
			return cache.addAll(filesToCache).then(function(){

				console.info('[APP SHELL] Service Worker loaded App Shell');
				console.info('[INSTALL] Service Worker Installed');

				// FORCE SERVICE WORKER TO GO FROM WAITING STATE TO ACTIVE STATE
				return self.skipWaiting();
			}).catch(function(err){
				console.warn('[INSTALL] Failed to load the App Shell: ' + err.message);
			});
		})
	);
});

// ACTIVATE:
self.addEventListener('activate', function(event){

	console.info('[ACTIVATE] Service Worker Activated');
	return self.clients.claim();
});

// FETCH:
self.addEventListener('fetch', function(event){

  event.respondWith(

		// CHECK IF THE DATA IS IN CACHE:
		caches.match(event.request)
			.then(function(response) {

				// IF FOUND, RETURN FROM THE CACHE
				if (response){
					console.info("[FETCH] Service Worker returning from Cache");
					return response;
				}

				// ELSE, FETCH FROM NETWORK, CACHE IT AND RESPOND TO THE REQUEST
				return fetch(event.request)
					.then(function(networkResponse){

						console.info("[FETCH] Service Worker returning from Network");

						// CLONE THE NETWORK RESPONSE AFTER RECEIVING IT:
						var responseToCache = networkResponse.clone();

						// OPEN CACHE, PUT THE REQUEST AND RESPONSE:
						caches.open(cache_name)
							.then(function(cache){

								// PUT REQUEST AND RESPONSE:
								cache.put(event.request, responseToCache)
									.then(function(){
										console.info("[FETCH] Service Worker caching the Response");
									})
									.catch(function(err){
										console.log(event.request.url + ': ' + err.message);
									});
							});

							// RETURN THE RESPONSE RECEIVED FROM NETWORK:
							return networkResponse;
					});
			})
		);
});
