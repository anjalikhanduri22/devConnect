const { userAuth } = require("../middlewares/auth");

const express = require("express");
const connectionRequestModel = require("../models/connectionRequest");
const requestRouter = express.Router();
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["intrested", "ignored"];
      if (!allowedStatus.includes(status)) {
        res.status(401).send("invalid status type");
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("user not found");
      }

      //created a new instance of connectionRequestModel
      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const existingConnection = await connectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnection) {
        throw new Error("connection request alreasy exists");
      }

      const data = await connectionRequest.save();
      res.json({
        message: "connection request sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }

    res.send(User.firstName + "is sending connection request");
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("status is not valid");
      }
      const connectionRequest = await connectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "intrested",
      });

      if (!connectionRequest) {
        throw new Error("connection request is not present");
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({
        message: "connection request " + status,
        data,
      });
    } catch (err) {
      res.status(401).send("ERROR: " + err.message);
    }
  }
);
module.exports = requestRouter;
