const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization)
            res.status(401).json({
                error: "Unauthorized",
            });
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
            req.user = decodedToken.user;
            next();
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "JWT token is expired" });
        }
        return res.status(401).json({
            error: "Unauthorized",
        });
    }
};

module.exports = auth;
