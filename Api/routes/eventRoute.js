const express = require("express");
const {
    createEvent,
    joinEvent,
    deleteEvent,
    getOneEvent,
    getAllEvents,
} = require("../controllers/eventController");

const eventRouter = express.Router();

eventRouter.post("/event", createEvent);
eventRouter.post("/event/:eventId/join", joinEvent);
eventRouter.delete("/event/:eventId", deleteEvent);
eventRouter.get("/event/:eventId", getOneEvent);
eventRouter.get("/events", getAllEvents);

module.exports = eventRouter;
