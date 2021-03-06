var express = require('express');
var mysql = require('mysql');
var Events = require('./datos/events.js').Events;
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

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

app.post('/events', function (req, resp) {
    var event = req.body;

    var events = new Events();
    events.insert(event);
    resp.status(200).send(event);
});

var serverPort = process.env.SERVER_PORT;
app.listen(serverPort, function () {
  console.log('Escuchando en el puerto ' + serverPort);
});
