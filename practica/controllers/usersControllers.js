const model = require("../models/usersModel");
const bcrypt = require("bcrypt");
const controller = {
  getRegister: (req, res) => {
    res.render("register", { error: req.query.error });
  },
  register: (req, res) => {
    const registerUser = model.findByEmail(req.body.email);
    if (registerUser) {
      return res.redirect("/register?error=El email ya esta registrado");
    }
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
    const validPw = bcrypt.compareSync(user.password, registerUser.password);
    if (validPw) {
      if (req.body.remember === "on") {
        //crear cooki
        res.cookie("userEmail", registerUser.email, {
          //esto es un anio
          maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        console.log("Mantener sesion iniciada");
      } else {
        console.log("No mantener sesion iniciada");
      }
      req.session.user = registerUser;
      console.log(req.body.remember);
      res.redirect("/home?userName=" + registerUser.userName);
    } else {
      res.redirect("/login?error=contrasenia incorrecta");
    }
  },
  logout: (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.log("Error al cerrar sesion");
      } else {
        res.clearCookie("userEmail");
        res.redirect("/home");
      }
    });
  },
};
module.exports = controller;
