const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const footballPitchSchema = new Schema({
    location: {
        required: true,
        type: String,
    },
    website: {
        required: true,
        type: String,
    },
    number: {
        required: true,
        type: String,
    },
    availability: {
        required: false,
        type: Date,
    },
});

const football_pitch = mongoose.model("Football_pitch", footballPitchSchema);
module.exports = football_pitch;
