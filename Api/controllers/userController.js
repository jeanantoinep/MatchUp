const Users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY;

const checkPassword = (password) => {
    // the checker checks for one uppercase, one lowercase, one digit and between 8 and 30 characters
    const checker = new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{2,30}$/
    );
    return checker.test(password);
};

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // check for duplicate users
        const duplicateUser = await Users.findOne({
            $or: [{ username: username }, { email: email }],
        });
        if (duplicateUser) {
            return res.status(409).json({
                message:
                    "The username or the email you're trying to use is already used.",
            });
        }
        // check for correct password
        // if (!checkPassword(password)) {
        //   return res.status(409).json({
        //     message: "The password does not meet the correct recommendations",
        //   });
        // }

        // hash password
        const hash = await bcrypt.hash(password, 10);

        // create new user
        const user = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            number: req.body.number,
            location: req.body.location,
            gender: req.body.gender,
            age: req.body.age,
        });

        // create token
        const payload = {
            user: {
                username: user.username,
                email: user.email,
                userId: user._id,
            },
        };
        const token = jwt.sign(payload, jwt_key, { expiresIn: "24h" });
        const refreshToken = jwt.sign(payload, jwt_key, {
            expiresIn: "30d",
        });
        user.refresh_token = refreshToken;
        await user.save();

        return res.status(200).json({
            message: "New user successfully created ! 🔥",
            token,
            refreshToken,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const login = async (req, res) => {
    const { login, password } = req.body;
    try {
        // check for duplicate users
        const user = await Users.findOne({
            $or: [{ username: login }, { email: login }],
        });
        if (!user) {
            return res.status(401).json({
                message: "Wrong credentials",
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({
                message: "Wrong credentials",
            });
        }

        // create token
        const payload = {
            user: {
                username: user.username,
                email: user.email,
                userId: user._id,
            },
        };

        // CREATE A NEW REFRESH TOKEN
        const refreshToken = jwt.sign(payload, jwt_key, {
            expiresIn: "30d",
        });
        user.refresh_token = refreshToken;

        const token = jwt.sign(payload, jwt_key, {
            expiresIn: "24h",
        });

        await user.save();

        return res.status(200).send({
            message: "Logged in successfully 🔥",
            token,
            refreshToken: user.refresh_token,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const refreshAccessToken = async (req, res) => {
    try {
        const { refresh_token } = req.body;

        // IF NO REFRESH TOKEN IS SEND RETURN 401 UNAUTHORIZED
        if (!refresh_token) {
            throw "Unauthorized";
        }

        // CHECK TOKEN EXPIRY DATE WITH DECODED TOKEN
        // IF EXPIRED DELETE FROM DB AND RETURN 401 REFRESH TOKEN EXPIRED
        const decodedToken = jwt.decode(refresh_token);
        if (decodedToken.exp <= Date.now() / 1000) {
            await Users.updateOne(
                { _id: decodedToken.user.userId },
                { refresh_token: null }
            );
            return res.status(401).json({
                error: "Refresh token is expired",
            });
        }

        // VERIFY TOKEN SIGNATURE
        const verifiedToken = jwt.verify(refresh_token, jwt_key);
        console.log(verifiedToken);

        // CHECK IF USER EXIST AND IF TOKEN IS FROM THE RIGHT USER IF NOT RETURN 401 UNAUTHORIZED
        const {
            user: { userId },
        } = verifiedToken;
        const user = await Users.findById(userId);
        if (!user || user.refresh_token !== refresh_token) {
            throw "Unauthorized";
        }

        // CREATE NEW ACCESS TOKEN AND SEND BACK TO USER
        const payload = {
            user: {
                username: user.username,
                email: user.email,
                userId: user._id,
            },
        };
        const token = jwt.sign(payload, jwt_key, {
            expiresIn: "2m",
        });
        return res
            .status(200)
            .send({ message: "New access token created", token });
    } catch (error) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }
};

const logout = async (req, res) => {
    try {
        const { userId } = req.user;
        await Users.findByIdAndUpdate(userId, { refresh_token: null });
        return res.status(200).send("User has been logged out");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getOneUser = async (req, res) => {
    const { id } = req.params;
    const user = await Users.findOne({ _id: id }).select(
        "-password -isAdmin --_v"
    );
    if (user) {
        return res.status(200).json({ user });
    }
    return res.status(404).send("User with the specified ID does not exists");
};

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Users.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        // check if new email and/or username is already taken
        if (updatedData.email) {
            const user = await Users.findOne({
                email: updatedData.email,
                _id: { $ne: id },
            });
            if (user) {
                return res
                    .status(409)
                    .json({ message: "This email is already taken" });
            }
        }
        if (updatedData.username) {
            const user = await Users.findOne({
                username: updatedData.username,
                _id: { $ne: id },
            });
            if (user) {
                return res
                    .status(409)
                    .json({ message: "This username is already taken" });
            }
        }

        const updated = await Users.findByIdAndUpdate(id, updatedData, options);
        if (updated) {
            return res.status(200).json({ message: "User updated", updated });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchUsers = async (req, res) => {
    try {
        const { username } = req.query;
        const regex = new RegExp(`^${username}`, "i");
        const users = await Users.find({ username: regex })
            .where({ _id: { $ne: req.user.userId } })
            .select("username")
            .limit(5);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    register,
    login,
    refreshAccessToken,
    logout,
    getOneUser,
    getAllUsers,
    deleteUser,
    updateUser,
    searchUsers,
};
