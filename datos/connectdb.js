var mysql = require('mysql');

function connectDB() {

    var conexion = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DB_NAME
    });

    conexion.connect();

    return conexion;
}

exports.connectDB = connectDB;
