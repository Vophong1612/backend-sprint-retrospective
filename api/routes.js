'use strict';

module.exports = function(app){
    let boardCtrl = require('./controller/Board');
    app.route('/my-board')
        .get(boardCtrl.get);
}