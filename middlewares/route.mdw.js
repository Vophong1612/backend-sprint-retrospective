const boardRoute = require("../routes/board.route");
const userRoute = require("../routes/user.route");
const taskRoute = require("../routes/task.route");
let count=0;
module.exports = (app) => {
    // app.use((req, res, next) => {
    //     req.session.username = 'vophong1';
    //     next();
    // })
    app.use("/board", boardRoute);
    app.use("/user", userRoute);
    app.use("/task", taskRoute);
}