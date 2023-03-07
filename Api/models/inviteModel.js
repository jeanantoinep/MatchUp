const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inviteSchema = new Schema({
    type: {
        required: true,
        type: String,
        enum: ["request", "invite"],
    },
    eventId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Events",
    },
    sender: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    receiver: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User",
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
