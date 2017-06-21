var express = require('express');
var mysql = require('mysql');
var Events = require('./datos/events.js').Events;

var app = express();

app.get('/events', function (req, resp) {
    var events = new Events();
    events.findAll()
        .then(function (datos) {
            resp.send(JSON.stringify(datos));
        })
        .catch(function (err) {
            console.log(err);
            resp.send('Error');
        });
});

app.get('/events/nearest', function (req, resp) {
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;

    var events = new Events();
    events.findNearest(latitude, longitude)
        .then(function (data) {
            resp.send(JSON.stringify(data));
        })
        .catch(function (err) {
            console.log(err);
            resp
                .status(500)
                .send('Error');
        });
});

app.listen(3000, function () {
  console.log('Escuchando en el puerto 3000');
});
