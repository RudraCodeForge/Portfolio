const express = require("express");

const AuthRouter = express.Router();

const AuthController = require("../Controller/Auth.controller");

AuthRouter.post("/login", AuthController.login);

AuthRouter.post("/verify-otp", AuthController.verifyOtp);

module.exports = AuthRouter;
