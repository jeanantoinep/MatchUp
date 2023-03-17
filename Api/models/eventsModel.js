const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("../models/usersModel");

const eventSchema = new Schema({
    participants: [
        {
            required: true,
            type: Schema.Types.ObjectId,
            ref: Users,
        },
    ],
    startDate: {
        required: true,
        type: Date,
        default: Date.now(),
    },
    endDate: {
        required: true,
        type: Date,
        default: Date.now(),
    },
    location: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    nb_participants: {
        required: true,
        type: Number,
    },
    creator: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: Users,
    },

    description: {
        required: false,
        default: null,
        type: String,
    },
});

const Events = mongoose.model("Events", eventSchema);
module.exports = Events;
