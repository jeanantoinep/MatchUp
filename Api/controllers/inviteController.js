const Invites = require("../models/inviteModel");
const User = require("../models/usersModel");

const createInvite = async (req, res) => {
    try {
        const newInvite = new Invites({ ...req.body, sender: req.user.id });
        await newInvite.save;
        return res.status(201).json({
            message: "L'invitation à bien été créée",
            newInvite,
        });
    } catch (error) {
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
        const { inviteId } = req.params;
        const deleted = await Invites.findByIdAndDelete(inviteId);
        if (deleted) {
            return res.status(200).send("Invitation deleted");
        }
        throw new Error("Invitation not found");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const acceptedInvite = async (req, res) => {
    try {
        const invite = await Invites.findById(req.params);
        if (invite) {
            invite.status = "accepted";
            await invite.save();
            return res.status(200).json(invite);
        }
        return res.status(404).send("Invitation not found");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = (createInvite, getOneInvite, getAllInvite, deleteInvite);
