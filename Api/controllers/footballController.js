const FootballPitch = require("../models/football_pitchModel");

const getFootballPitch = async (req, res) => {
    try {
        const { id } = req.params;
        const footballPitch = await FootballPitch.findById(id);
        if (footballPitch) {
            return res.status(200).json({ footballPitch });
        }
        return res
            .status(404)
            .send("Football pitch with the specified ID does not exists");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

getAllFootballPitch = async (req, res) => {
    try {
        const footballPitch = await FootballPitch.find();
        res.status(200).json({ footballPitch });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createFootballPitch = async (req, res) => {
    try {
        const footballPitch = await new FootballPitch(req.body);
        await footballPitch.save();
        return res.status(201).json({ footballPitch });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFootballPitch,
    createFootballPitch,
    getAllFootballPitch,
};
