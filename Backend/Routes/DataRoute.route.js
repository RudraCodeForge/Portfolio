const express = require("express");
const DataRouter = express.Router();
const DataController = require("../Controller/Data.controller");

DataRouter.get("/", DataController.GET_DATA);

module.exports = DataRouter;
