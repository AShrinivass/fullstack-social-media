import Post from "../models/Post.js";
import express from "express";
import User from "../models/User.js";

const router = express.Router();

//create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post
router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (req.body.userID === post.userID) {
      await post.updateOne({ $set: req.body });
      res.status(200).json(post);
    } else {
      res.status(403).json("Something went wrong");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (req.body.userID === post.userID) {
      await post.deleteOne();
      res.status(200).json("post has been deleted");
    } else {
      res.status(404).json("could not find post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
router.get("/timeline/:id", async (req, res) => {
  try {
    const currUser = await User.findById(req.params.id);
    const currUserPosts = await Post.find({ userID: currUser._id });
    const friendPosts = await Promise.all(
      currUser.following.map((friendID) => {
        return Post.find({ userID: friendID });
      })
    );
    res.json(currUserPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json("Could not find posts");
  }
});

export default router;

//get all user post in profile section

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const post = await Post.find({ userID: user._id });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Like dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userID)) {
      await post.updateOne({ $push: { likes: req.body.userID } });
      res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userID } });
      res.status(200).json("Post has been disliked");
    }
  } catch (err) {}
  res.status(500).json(err);
});
