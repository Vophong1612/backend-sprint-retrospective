const express = require('express');
const cors=require("cors")
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    // Mọi domain
    res.header("Access-Control-Allow-Origin", "*");
   
    // Domain nhất định
    // res.header("Access-Control-Allow-Origin", "https://freetuts.net");
   
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
let routes = require('./api/routes') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port, () => {
    console.log('RESTful API server started on: ' + port);
});
 
 
