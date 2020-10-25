'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'remotemysql.com',
    port: '3306',
    user: 'Jimp270qal',
    password: '7Ug1ze1v5P',
    database: 'Jimp270qal'
});

module.exports = db;