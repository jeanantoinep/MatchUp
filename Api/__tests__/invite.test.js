const mongoose = require("mongoose");
const Invites = require("../models/inviteModel");
const {
    cancelInvite,
    acceptedInvite,
    createInvite,
    getAllInvite,
} = require("../controllers/inviteController");

describe("acceptedInvite", () => {
    let res;
    let req;
    let inviteId;

    beforeAll(async () => {
        // Connect to the test database
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb://localhost/test-db", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Disconnect from the test database
        await mongoose.connection.close();
    });

    beforeEach(() => {
        // Reset the mock response and request objects
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        req = {
            params: inviteId,
        };
    });

    it("should return a 404 error if the invite is not found", async () => {
        await acceptedInvite(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("Invitation not found");
    });

    it('should update the invite status to "accepted" and return the updated invite', async () => {
        // Create a test invite
        const receiver = {
            _id: mongoose.Types.ObjectId(),
            username: "testuser",
        };

        // Create a test sender
        const sender = {
            _id: mongoose.Types.ObjectId(),
            username: "testsender",
        };

        // Create a test event
        const event = {
            _id: mongoose.Types.ObjectId(),
            name: "testevent",
            participants: [receiver._id],
        };
        // Create a test invite from the sender to the receiver for the event
        const invite = new Invites({
            type: "event",
            eventId: event._id,
            sender: sender._id,
            receiver: receiver._id,
            status: "pending",
        });

        const savedInvite = await invite.save();

        // Update the request parameters with the ID of the test invite
        req.params = savedInvite._id.toString();

        // Call the acceptedInvite function with the updated request and mock response objects
        await acceptedInvite(req, res);

        // Check that the invite status has been updated to "accepted"
        const updatedInvite = await Invites.findById(savedInvite._id);
        expect(updatedInvite.status).toEqual("accepted");
    });

    it('should update the invite status to "cancelled" and return the updated invite', async () => {
        // Create a test invite
        const receiver = {
            _id: mongoose.Types.ObjectId(),
            username: "testuser",
        };

        // Create a test sender
        const sender = {
            _id: mongoose.Types.ObjectId(),
            username: "testsender",
        };

        // Create a test event
        const event = {
            _id: mongoose.Types.ObjectId(),
            name: "testevent",
            participants: [receiver._id],
        };
        // Create a test invite from the sender to the receiver for the event
        const invite = new Invites({
            type: "event",
            eventId: event._id,
            sender: sender._id,
            receiver: receiver._id,
            status: "pending",
        });

        const savedInvite = await invite.save();

        req.params = savedInvite._id.toString();

        await cancelInvite(req, res);

        const updatedInvite = await Invites.findById(savedInvite._id);
        expect(updatedInvite.status).toEqual("cancelled");
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return a 500 error if an unexpected error occurs", async () => {
        // Set the inviteId to an invalid value to cause a database error
        req.params = "invalid-id";

        await acceptedInvite(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(expect.any(String));
    });
});
