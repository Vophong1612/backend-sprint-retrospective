
module.exports = function (app) {
    app.use(async (req, res, next) => {
      res.locals.user = req.session.user;
      next();
    })
  };