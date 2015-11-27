var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.send('Bienvenidos al WS de Places');
});

router.get('/get', function(req, res, next) {
	var longitud = req.query.longitud;
	var latitud = req.query.latitud;
	res.send('Su longitud: '+longitud+'y latitud: '+latitud);
});

module.exports = router;