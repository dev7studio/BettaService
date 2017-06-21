var mysql = require('mysql');

function Events() {}

function _connect() {

    var conexion = mysql.createConnection({
        host: '192.168.1.50',
        user: 'root',
        password: 'root',
        database: 'uparty'
    });

    conexion.connect();

    return conexion;
}

function _findAll(resolve, reject) {

    var conexion = _connect();

    conexion.query(
        'SELECT * FROM event',
        function (error, resultado, campos) {
            if (error) reject(error);
            resolve(resultado);
        }
    );

    conexion.end();
}

function _findNearest(latitude, longitude, resolve, reject) {

    var conexion = _connect();

    conexion.query(
        'SELECT * FROM event WHERE SQRT(POWER(lat_event - ?, 2) + POWER(long_event - ?, 2)) < 0.1',
        [latitude, longitude],
        function (error, resultado, campos) {
            if (error) reject(error);
            resolve(resultado);
        }
    );

    conexion.end();
}

Events.prototype.findAll = function findAll() {
    return new Promise(function (resolve, reject) {
        _findAll(resolve, reject);
    });
}

Events.prototype.findNearest = function findNearest(latitude, longitude) {
    return new Promise(function (resolve, reject) {
        _findNearest(latitude, longitude, resolve, reject);
    });
}

exports.Events = Events;
