const express = require("express");
const auth = require("../middlewares/auth");

const {
    createInvite,
    getOneInvite,
    getAllInvite,
    deleteInvite,
    acceptedInvite,
    cancelInvite,
    getEventInvite,
    getUserInvite,
    declineInvite,
} = require("../controllers/inviteController");

const inviteRouter = express.Router();

inviteRouter.post("/invite", auth, createInvite);
inviteRouter.get("/invite/user", auth, getUserInvite);
inviteRouter.get("/invite/:id", auth, getOneInvite);
inviteRouter.get("/event/invite/:eventId", auth, getEventInvite);
inviteRouter.get("/invites", auth, getAllInvite);
inviteRouter.delete("/invite/:id", auth, deleteInvite);
inviteRouter.put("/invite/accept/:id", auth, acceptedInvite);
inviteRouter.put("/invite/decline/:id", auth, declineInvite);
inviteRouter.put("/invite/cancel/:id", auth, cancelInvite);

module.exports = inviteRouter;
