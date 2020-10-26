'use strict'

const util = require('util');
const mysql = require('mysql');
const db = require('./../db');

module.exports = {
    get: (req, res) => {
        let sql = 'Select * from board';
         db.query(sql, (err, response) => {
            if (err) throw err;
            return res.send(response);
        })
    },
}
