const express = require("express");
const {
  register,
  login,
  getOneUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController.js");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users/:id", getOneUser);
userRouter.get("/users", getAllUsers);
userRouter.delete("/users/:id", deleteUser);

module.exports = userRouter;
