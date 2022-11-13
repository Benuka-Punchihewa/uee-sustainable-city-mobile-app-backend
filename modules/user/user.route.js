const express = require("express");
const constants = require("../../constants");
const router = express.Router();
const AuthMiddleware = require("../auth/auth.middleware");
const UserController = require("./user.controller");

// create user
router.post("/user", UserController.createUser);

// route exports
module.exports = router;
