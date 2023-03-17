const Invites = require("../models/inviteModel");
const { joinEvent } = require("./eventController");
const Event = require("../models/eventsModel");

const createInvite = async (req, res) => {
    try {
        const newInvite = new Invites({ ...req.body, sender: req.user.userId });
        await newInvite.save();
        return res.status(201).json({
            message: "L'invitation à bien été créée",
            newInvite,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getUserInvite = async (req, res) => {
    try {
        const { userId } = req.user;
        const userInvites = await Invites.find({
            receiver: userId,
            status: { $nin: ["cancelled", "rejected", "accepted"] },
        })
            .populate({ path: "eventId", select: "name" })
            .populate({ path: "sender", select: "username" });
        return res.status(200).json(userInvites);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
};

const getOneInvite = async (req, res) => {
    try {
        const { eventId } = req.params;
        const invite = await Invites.findById(eventId);
        if (invite) return res.status(201).json(invite);
        return res.status(404).send("There is no invitation for this ID");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getEventInvite = async (req, res) => {
    try {
        const { eventId } = req.params;
        const invites = await Invites.find({
            eventId,
            status: { $ne: "cancelled" },
        });
        return res.status(200).json(invites);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getAllInvite = async (req, res) => {
    try {
        const invites = await Invites.find();
        res.status(200).json({ invites });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteInvite = async (req, res) => {
    try {
        const invite = await Invites.findById(req.params);
        if (invite) {
            invite.status = "deleted";
            await invite.save();
            return res.status(200).send("Invitation successfully deleted");
        }
        return res.status(404).send("Invitation not found");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const acceptedInvite = async (req, res) => {
    try {
        const invite = await Invites.findById(req.params.id);
        const userId =
            invite.type === "request" ? invite.sender : invite.receiver;
        if (invite.status === "pending") {
            invite.status = "accepted";
            await invite.save();
            const event = await Event.findById(invite.eventId);
            if (!event) {
                return res.status(404).json({
                    message: "Event not found",
                });
            }
            if (event.participants.includes(userId)) {
                return res.status(400).json({
                    message: "User has already joined the event.",
                });
            }
            event.participants.push(userId);
            await event.save();
            return res.status(200).json({
                message: "User successfully joined the event",
                event,
            });
        }
        return res.status(404).send("Invitation not found");
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

const declineInvite = async (req, res) => {
    try {
        const invite = await Invites.findById(req.params.id);
        if (invite) {
            invite.status = "rejected";
            await invite.save();
            return res.status(200).json(invite);
        }
        return res.status(404).send("Invitation not found");
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};
const cancelInvite = async (req, res) => {
    try {
        const invite = await Invites.findById(req.params.id);
        if (invite) {
            invite.status = "cancelled";
            await invite.save();
            return res.status(200).json(invite);
        }
        return res.status(404).send("Invitation not found");
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

module.exports = {
    createInvite,
    getUserInvite,
    getOneInvite,
    getEventInvite,
    getAllInvite,
    deleteInvite,
    cancelInvite,
    declineInvite,
    acceptedInvite,
};
