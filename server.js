const express = require('express');
const cors = require("cors");
const app = express();
const session = require("express-session");
const mdw = require("./middlewares/route.mdw");
const local = require("./middlewares/local.mdw");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

app.use(logger("dev"));
app.use(cors({origin:"http://sprint-retrospective-web.herokuapp.com/",credentials:true}));
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
