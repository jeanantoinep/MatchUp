const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./routes/routesUser");
const product = require("./routes/routeProduct");
const order = require("./routes/orderRoute");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.listen(3000, () => console.log("Listening on port 3000"));

require("dotenv").config();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.get("/", (req, res) => res.send("My first REST API!"));
app.listen(port, () => {
  console.log("Listening on port " + port);
});
