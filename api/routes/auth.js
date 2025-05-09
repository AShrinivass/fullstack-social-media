import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("cannot find user");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    !validPass && res.status(400).json("wrong password");

    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    res.status(404).json(err);
  }
});

export default router;
