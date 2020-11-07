const express = require('express');
const cors = require("cors");
const app = express();
const session = require("express-session");
const mdw = require("./middlewares/route.mdw");
const local = require("./middlewares/local.mdw");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(proxy("/**", { // https://github.com/chimurai/http-proxy-middleware
    target: "https://backend-sprint-retrospective.herokuapp.com",
    secure: false
  }));
};

app.use(function (req, res, next) {
    // Mọi domain
//     res.header("Access-Control-Allow-Origin", "*");

    // Domain nhất định
    res.header("Access-Control-Allow-Origin", "https://sprint-retrospective-web.herokuapp.com");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    res.header("Access-Control-Allow-Credentials", true);
    
    next();
});

app.use(logger("dev"));
// app.use(cors({origin:"https://sprint-retrospective-web.herokuapp.com",credentials:true}));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "0",
}));
mdw(app); local(app);

const port = process.env.PORT || 5000;

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(port, () => {
    console.log('Web server running at http://localhost:' + port);
});

module.exports = app;
