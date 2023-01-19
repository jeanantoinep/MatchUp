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
        const {eventId} = req.params;

        
    } catch (error) {
        
    }
}

module.exports = { createEvent };
