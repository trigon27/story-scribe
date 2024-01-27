const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const registerRoute = express.Router();
registerRoute.post("/", async (req, res) => {
  const { userName, password } = req.body;
  // console.log(userName,password);

  try {
    // Check if username is provided
    if (!userName) {
      return res.status(400).json({ error: "Username is required" });
    }

    //creating hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const dataDoc = await Users.create({ userName, password: hashedPassword });
    res.json(dataDoc);
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = registerRoute;
