const express = require("express");

const ContactRouter = express.Router();

const ContactController = require("../Controller/Contact.controller");

ContactRouter.post("/", ContactController.ContactMe);

module.exports = ContactRouter;
