const Event = require("../models/eventsModel");
const Invites = require("../models/inviteModel");
const User = require("../models/usersModel");

const createEvent = async (req, res) => {
    try {
        const newEvent = new Event({ ...req.body, creator: req.user.userId });
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
        const { userId } = req.user;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        if (event.participants.includes(user._id)) {
            return res.status(400).json({
                message: "User has already joined the event.",
            });
        }
        const Invites = await Invites.findOne({
            event: eventId,
            receiver: userId,
        });
        if (Invites.status === "accepted") {
            event.participants.push(user._id);
            await event.save();
            return res.status(200).json({
                message: "User successfully joined the event",
                event,
            });
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getOneEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findOne({ _id: eventId }).populate(
            "participants",
            "username"
        );
        if (event) {
            return res.status(200).json({ event });
        }
        return res
            .status(404)
            .send("User with the specified ID does not exists");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const user = await User.findById(req.user.userId);
        const event = await Event.findById(eventId);
        if (user._id.toString() === event.creator.toString()) {
            const updated = await Event.findByIdAndUpdate(eventId, req.body, {
                new: true,
            });
            if (updated) {
                return res
                    .status(200)
                    .send({ message: "Event successfully updated" });
            }
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(403).send({ message: "Forbidden" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const leaveEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.user;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }
        if (!event.participants.includes(userId)) {
            return res.status(400).json({
                message: "User has not joined the event.",
            });
        }
        event.participants = event.participants.filter(
            (participant) => participant.toString() !== userId
        );
        await event.save();
        return res.status(200).json({
            message: "User succesfully leave the event",
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
            return res
                .status(200)
                .send({ message: "Event successfully deleted" });
        }
        return res.status(404).json({ message: "Event not found" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    createEvent,
    joinEvent,
    deleteEvent,
    getOneEvent,
    getAllEvents,
    updateEvent,
    leaveEvent,
};
