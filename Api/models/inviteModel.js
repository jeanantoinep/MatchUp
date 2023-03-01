const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("../models/usersModel");

const inviteSchema = new Schema({
    type: {
        required: true,
        type: String,
        enum: ["request", "invite"],
    },
    eventId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Event",
    },
    sender: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: Users,
    },
    receiver: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: Users,
    },
    date: {
        required: true,
        type: Date,
        default: Date.now(),
    },
    status: {
        required: true,
        type: String,
        enum: ["pending", "accepted", "rejected", "cancelled"],
        default: "pending",
    },
});

const Invites = mongoose.model("Invite", inviteSchema);
module.exports = Invites;
