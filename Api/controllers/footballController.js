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
