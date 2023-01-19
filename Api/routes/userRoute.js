const express = require("express");
const {
    register,
    login,
    getOneUser,
    getAllUsers,
    deleteUser,
    updateUser,
} = require("../controllers/userController.js");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/user/:id", getOneUser);
userRouter.get("/users", getAllUsers);
userRouter.delete("/user/:id", deleteUser);
userRouter.put("/user/:id", updateUser);

module.exports = userRouter;
