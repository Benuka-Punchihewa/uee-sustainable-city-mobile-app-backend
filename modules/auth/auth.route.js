const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");

// login
router.post("/login", authController.login);

// route exports
module.exports = router;
