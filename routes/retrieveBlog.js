const express = require("express");
const retrieveBlog = express.Router();
const Post = require("../models/Post");
retrieveBlog.get("/", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["userName"])
      .sort({ createdAt: -1 })
      .limit(25)
  );
});
module.exports = retrieveBlog;
