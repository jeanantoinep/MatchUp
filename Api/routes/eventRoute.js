const express = require("express");
const auth = require("../middlewares/auth");

const {
    createEvent,
    joinEvent,
    deleteEvent,
    getOneEvent,
    getAllEvents,
    updateEvent,
    leaveEvent,
} = require("../controllers/eventController");

const eventRouter = express.Router();

eventRouter.post("/event", auth, createEvent);
eventRouter.post("/event/:eventId/join", auth, joinEvent);
eventRouter.delete("/event/:eventId", auth, deleteEvent);
eventRouter.get("/event/:eventId", auth, getOneEvent);
eventRouter.get("/events", auth, getAllEvents);
eventRouter.put("/event/:eventId", auth, updateEvent);
eventRouter.post("/event/:eventId/leave", auth, leaveEvent);

module.exports = eventRouter;
