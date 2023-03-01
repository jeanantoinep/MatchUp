const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./routes/userRoute");
const event = require("./routes/eventRoute");
const invite = require("./routes/inviteRoute");
const morgan = require("morgan");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.listen(3000, () => {
    console.log("Listening on port 3000");
});

require("dotenv").config();

mongoose.set("strictQuery", false);
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected");
});

app.use(user);
app.use(event);
app.use(invite);
