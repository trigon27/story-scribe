const express = require("express");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "lsjfahsuihejfhh3uffvh";
const loginRoutes = express.Router();

loginRoutes.post("/", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Validate input
    if (!userName || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const docData = await Users.findOne({ userName });

    if (!docData) {
      return res.status(400).json({ error: "Username not found" });
    }

    const passOK = bcrypt.compareSync(password, docData.password);

    if (passOK) {
      // Generate JWT token
      const token = jwt.sign({ userName, id: docData._id }, secret, {
        expiresIn: "30d",
      });

      // Set the token as a cookie (secure and HTTP-only flags can be added)
      res.cookie("token", token, {
        httpOnly: true,
      });
      // console.log(token)

      // Respond with user information or a success message
      res.json({
        id: docData._id,
        userName,
        message: "Login successful",
      });
    } else {
      res.status(400).json({ error: "Incorrect credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = loginRoutes;
``;
