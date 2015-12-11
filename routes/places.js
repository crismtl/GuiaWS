var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function(req, res, next) {
  res.send('Bienvenidos al WS de Places');
});

router.get('/pois', function(req, res, next) {
  var latitud = req.query.latitud,
    longitud = req.query.longitud,
    tipos = req.query.tipos;
  //tipos = tiposTexto.split('|');
  console.log(tipos);
  traerDatosGoogle(latitud, longitud, tipos, function(datos) {

    var respuesta = JSON.parse(datos);

    var data = eval(respuesta);
    var respuestaOrdenadaDeMayorAMenor = data['results'];
    respuestaOrdenadaDeMayorAMenor.sort(function(a, b) {
      if (a.rating == b.rating)
        return 0;
      if (a.rating < b.rating)
        return -1;
      if (a.rating > b.rating)
        return 1;
    });

    res.json(respuestaOrdenadaDeMayorAMenor);
  })
});

function traerDatosGoogle(latitud, longitud, tipos, callback) {

  request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitud + ',' + longitud + '&radius=500&types=' + tipos + '&key=AIzaSyBZzx_zsBJQEn5ufg9HqtZl7nDRAbjfApI&', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      return callback(body);
    }
  })
}
module.exports = router;
