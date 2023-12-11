const middlewares = {
  checkAdmin: (req, res, next) => {
    if (req.query.userType === "admin") {
      next();
    } else {
      res.redirect("/products/list");
    }
  },
};

module.exports = middlewares;
