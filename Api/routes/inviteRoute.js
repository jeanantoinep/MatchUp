const express = require("express");
const auth = require("../middlewares/auth");

const {
    createInvite,
    getOneInvite,
    getAllInvite,
    deleteInvite,
    acceptedInvite,
    cancelInvite,
} = require("../controllers/inviteController");

const inviteRouter = express.Router();

inviteRouter.post("/invite", auth, createInvite);
inviteRouter.get("/invite/:id", auth, getOneInvite);
inviteRouter.get("/invites", auth, getAllInvite);
inviteRouter.delete("/invite/:id", auth, deleteInvite);
inviteRouter.put("/invite/:id/accepted", auth, acceptedInvite);
inviteRouter.put("/invite/:id/cancel", auth, cancelInvite);

module.exports = inviteRouter;
