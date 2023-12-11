const { findByEmail } = require("../models/usersModel");

const controller = {
  getHome: (req, res) => {
    const userName = req.query.userName;
    res.render("index", { userName });
  },
};
module.exports = controller;
