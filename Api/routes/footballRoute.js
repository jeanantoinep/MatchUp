const express = require("express");

const {
    createFootballPitch,
    getFootballPitch,
} = require("../controllers/footballController");

const footballRouter = express.Router();

footballRouter.post("/football", createFootballPitch);
footballRouter.get("/football/:id", getFootballPitch);
footballRouter.get("/footballs", getAllFootballPitch);

module.exports = footballRouter;
