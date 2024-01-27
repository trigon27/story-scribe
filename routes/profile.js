const express = require("express");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const secret = "lsjfahsuihejfhh3uffvh";
const profileRoutes = express.Router();
profileRoutes.get("/", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      } else if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized - Token expired" });
      }

      // Handle other JWT verification errors
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Token is valid, send user information
    res.json(info);
  });
});

module.exports = profileRoutes;
