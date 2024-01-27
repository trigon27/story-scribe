const express = require("express");
const singleBlog = express.Router();
const Post = require("../models/Post");

singleBlog.get("/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["userName"]);
  res.json(postDoc);
});
module.exports = singleBlog;
