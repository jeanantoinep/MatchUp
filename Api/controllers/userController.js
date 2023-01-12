const Users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    });
    user.save();

    // create token
    const payload = {
      user: {
        username: user.username,
        email: user.email,
        userId: user._id,
      },
    };
    const token = jwt.sign(payload, "RANDOM-TOKEN", { expiresIn: "24h" });

    return res.status(200).json({
      message: "New user successfully created ! 🔥",
      token,
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
      return res.status(409).json({
        message:
          "The username or the email you're trying to use is not registered.",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // create token
      const payload = {
        user: {
          username: user.username,
          email: user.email,
          userId: user._id,
        },
      };
      const token = jwt.sign(payload, "RANDOM-TOKEN", { expiresIn: "24h" });

      res.status(200).send({
        message: "Logged successfully 🔥",
        token,
      });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findOne({ _id: id });
  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.status(404).send("User with the specified ID does not exists");
  }
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

module.exports = {
  register,
  login,
  getOneUser,
  getAllUsers,
  deleteUser,
};
