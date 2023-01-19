const express = require("express");
const { createEvent } = require("../controllers/eventController");

const eventRouter = express.Router();

eventRouter.post("/event", createEvent);

module.exports = eventRouter;
