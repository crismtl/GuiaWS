var express = require('express');
var router = express.Router();
var https = require('https');

var request = require('request');

router.get('/', function(req, res, next) {
	res.send('Bienvenidos al WS de Places');
});

router.get('/get', function(req, res, next) {

	var longitud = req.query.longitud;
	var latitud = req.query.latitud;
	//poner cabezara json
	traerDatosGoogle(longitud, latitud, function(datos){
			res.send(datos);
	});
});

function traerDatosGoogle (longitud, latitud, callback){
	var opcionesDeServidorConRequest = {
		url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-0.220379,%20-78.5120386&radius=500&types=food&key=AIzaSyBZzx_zsBJQEn5ufg9HqtZl7nDRAbjfApI&',
		headers: {
			'Content-Type': 'application/json'
		}
	};


	request(opcionesDeServidorConRequest, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) // Show the HTML for the Google homepage.
			return callback(body);
	  }
	})
}
module.exports = router;
