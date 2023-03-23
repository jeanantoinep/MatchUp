const express = require("express");
const {
    register,
    login,
    getOneUser,
    getAllUsers,
    deleteUser,
    searchUsers,
    updateUser,
    refreshAccessToken,
    logout,
} = require("../controllers/userController.js");
const auth = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/refresh_token", refreshAccessToken);
userRouter.post("/logout", auth, logout);
userRouter.get("/user/:id", getOneUser);
userRouter.get("/user", auth, searchUsers);
userRouter.get("/users", getAllUsers);
userRouter.delete("/user/:id", deleteUser);
userRouter.put("/user/:id", updateUser);

module.exports = userRouter;
