const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    is_admin: {
        required: true,
        default: false,
        type: Boolean,
    },
    username: {
        required: true,
        type: String,
    },
    firstname: {
        required: true,
        type: String,
    },
    lastname: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    number: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    location: {
        required: true,
        type: String,
    },
    age: {
        required: true,
        type: String,
        enum: ["-18", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
    },
    gender: {
        required: true,
        type: String,
        enum: ["male", "female", "other"],
    },
    refresh_token: {
        type: String,
    },
});

const Users = mongoose.model("User", userSchema);
module.exports = Users;
