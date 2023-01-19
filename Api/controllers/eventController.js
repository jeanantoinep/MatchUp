const Event = require("../models/eventsModel");

const createEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);

        await newEvent.save();
        return res.status(201).json({
            message: "New event successfully created ! 🔥",
            event: newEvent,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const joinEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        event.participants.push(user);
        await event.save();
        return res.status(200).json({
            message: "User successfully joined the event",
            event,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const deleted = await Event.findByIdAndDelete(eventId);
        if (deleted) {
            return res.status(200).send("Event deleted");
        }
        throw new Error("Event not found");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { createEvent, joinEvent, deleteEvent };
