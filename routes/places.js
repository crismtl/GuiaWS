var express = require('express');
var router = express.Router();
var https = require('https');

router.get('/', function(req, res, next) {
	res.send('Bienvenidos al WS de Places');
});

router.get('/get', function(req, res, next) {
	var longitud = req.query.longitud;
	var latitud = req.query.latitud;

	//var lugares;

	var opcionesDeServidor = {
		hostname: 'www.googleapis.com',
		port: 443,
		path: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-0.220379,%20-78.5120386&radius=500&types=food&key=AIzaSyBZzx_zsBJQEn5ufg9HqtZl7nDRAbjfApI&',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	var requestAServidor = https.request(opcionesDeServidor, function(responseDeServidor) {
		responseDeServidor.setEncoding('utf8');
		responseDeServidor.on('data', function (chunk) {
			console.log(chunk);
			/*aqui se puede usar los datos que se recibe, pero no se puede usar directamente
			res.send(chunk) porque da un error.
			la otra opcion era crear una variable global y guardarla con el valor de chunk
			lugares = chunk, pero no funciona porque manda cuando todavia esta vacia la variable*/
		});
		responseDeServidor.on('end', function() {
			console.log('No more data in response.')
		})
	});

	requestAServidor.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	requestAServidor.end();
	//res.send(lugares);
});

module.exports = router;
