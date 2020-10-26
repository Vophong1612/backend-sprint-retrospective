'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'remotemysql.com',
    port:'3306',
    user: process.env.DB_HOST || 'Jimp270qal',
    password: process.env.DB_HOST || '7Ug1ze1v5P',
    database: process.env.DB_HOST || 'Jimp270qal'
});

module.exports = db;