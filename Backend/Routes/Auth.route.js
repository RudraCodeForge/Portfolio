const express = require("express");

const AuthRouter = express.Router();

const AuthController = require("../Controller/Auth.controller");

AuthRouter.post("/login", AuthController.login);

AuthRouter.post("/verify-otp", AuthController.verifyOtp);

AuthRouter.post("/resend-otp", AuthController.resendOtp);

AuthRouter.post("/forgot-password", AuthController.forgotPassword);

AuthRouter.post("/verify-reset-otp", AuthController.verifyResetOtp);

AuthRouter.post("/reset-password", AuthController.resetPassword);

AuthRouter.post("/refresh", AuthController.refreshAccessToken);

AuthRouter.post("/logout", AuthController.logout);

module.exports = AuthRouter;
