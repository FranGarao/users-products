const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexControllers");

router.get("/home", indexController.getHome);

module.exports = router;
