var connectDB = require('./connectdb').connectDB;

function Events() {}

function _findAll(resolve, reject) {

    var conexion = connectDB();

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

    var conexion = connectDB();

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

function _insert(event) {

    var conexion = connectDB();

    conexion.query(
            'INSERT INTO event ' +
            '(name_event, deleted_event, lat_event, long_event, dir_event, fechainicio_event, time_event, fechafinal_event, category_event, id_owner, descrip_event) ' +
            'VALUES ' +
            '(?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                event.name_event,
                event.lat_event,
                event.long_event,
                event.dir_event,
                event.fechainicio_event,
                event.time_event,
                event.fechafinal_event,
                event.category_event,
                event.id_owner,
                event.descrip_event
            ]
        );
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

Events.prototype.insert = function insert(event) {
    _insert(event);
}

exports.Events = Events;
