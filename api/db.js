'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database: 'dbsprintretrospective'
});

module.exports = db;