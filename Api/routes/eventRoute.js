const express = require("express");
const { createEvent, joinEvent } = require("../controllers/eventController");

const eventRouter = express.Router();

eventRouter.post("/event", createEvent);
eventRouter.post("/event/:eventId/join", joinEvent);

module.exports = eventRouter;
