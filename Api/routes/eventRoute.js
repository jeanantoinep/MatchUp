const express = require("express");
const {
    createEvent,
    joinEvent,
    deleteEvent,
} = require("../controllers/eventController");

const eventRouter = express.Router();

eventRouter.post("/event", createEvent);
eventRouter.post("/event/:eventId/join", joinEvent);
eventRouter.delete("/event/:eventId", deleteEvent);

module.exports = eventRouter;
