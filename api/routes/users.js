import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
const router = Router();

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userID === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account has been updated");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).json("You can only update your account");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userID === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("account has been deleted");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).json("You can only delete your account");
  }
});
//get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(403).json(err);
  }
});
//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userID !== req.params.id) {
    try {
      const targetUser = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userID);
      if (!targetUser.followers.includes(req.body.userID)) {
        await targetUser.updateOne({ $push: { followers: req.body.userID } });
        await currUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("You already follow  this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Cannot follow yourself");
  }
});
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userID !== req.params.id) {
    try {
      const targetUser = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userID);
      if (targetUser.followers.includes(req.body.userID)) {
        await targetUser.updateOne({ $pull: { followers: req.body.userID } });
        await currUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("You already do not follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Cannot unfollow yourself");
  }
});
export default router;
