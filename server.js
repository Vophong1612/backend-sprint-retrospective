const express = require('express');
const cors=require("cors")
const app = express(cors({
    origin:"http://*.herokuapp.com"
}));
const bodyParser = require('body-parser');

const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let routes = require('./api/routes') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port, () => {
    console.log('RESTful API server started on: ' + port);
});
 
