const express = require("express");

const {
    createInvite,
    getOneInvite,
    getAllInvite,
    deleteInvite,
    acceptedInvite,
    cancelInvite,
} = require("../controllers/inviteController");

const inviteRouter = express.Router();

inviteRouter.post("/invite", createInvite);
inviteRouter.get("/invite/:id", getOneInvite);
inviteRouter.get("/invites", getAllInvite);
inviteRouter.delete("/invite/:id", deleteInvite);
inviteRouter.put("/invite/:id/accepted", acceptedInvite);
inviteRouter.put("/invite/:id/cancel", cancelInvite);
