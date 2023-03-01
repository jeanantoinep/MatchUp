const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inviteSchema = new Schema({
    type: {
        required: true,
        type: String,
    },
    eventId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Event",
    },
    sender: {
        required: true,
        type: String,
    },
    receiver: {
        required: true,
        type: String,
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
    },
});

const Invites = mongoose.model("Invite", inviteSchema);
module.exports = Invites;
