const model = require("../models/usersModel");
const bcrypt = require("bcrypt");
const controller = {
  getRegister: (req, res) => {
    res.render("register");
  },
  register: (req, res) => {
    const user = {
      userName: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    model.create(user);
    res.redirect("/login");
  },
  getLogin: (req, res) => {
    const errors = req.params.error;
    res.render("login", { errors });
  },
  login: (req, res) => {
    const user = { email: req.body.email, password: req.body.password };
    const registerUser = model.findByEmail(user.email);
    if (!registerUser) {
      return res.redirect("/login?error=El email no esta registrado");
    }
    console.log(registerUser);
    const validPw = bcrypt.compareSync(user.password, registerUser.password);
    if (validPw) {
      res.redirect("/home?userName=" + registerUser.userName);
    } else {
      res.redirect("/login?error=contrasenia incorrecta");
    }
  },
};
module.exports = controller;
