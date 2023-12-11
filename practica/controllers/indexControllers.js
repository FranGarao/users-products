const { clear } = require("console");
const { findByEmail } = require("../models/usersModel");
const session = require("express-session");
const controller = {
  getHome: (req, res) => {
    const user = req.session.user;
    console.log(user);
    res.render("index", { user });
  },
};
module.exports = controller;
