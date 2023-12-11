const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersControllers");

router.get("/register", controller.getRegister);
router.post("/register", controller.register);

router.get("/login", controller.getLogin);
router.post("/login", controller.login);

module.exports = router;
