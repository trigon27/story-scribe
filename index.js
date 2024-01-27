const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const DBconnection = require("./database/db.js");
const path = require("path");
const registerRoute = require("./routes/register.js");
const loginRoutes = require("./routes/login.js");
const { profile } = require("console");
const profileRoutes = require("./routes/profile.js");
const logoutRoutes = require("./routes/logout.js");
const postBlog = require("./routes/postBlog.js");
const retrieveBlog = require("./routes/retrieveBlog.js");
const singleBlog = require("./routes/singleBlog.js");
const port = process.env.PORT || 4000;

app.use(express.static(path.resolve(__dirname, "build")));
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

DBconnection();

app.use("/register", registerRoute);

app.use("/login", loginRoutes);

app.use("/profile", profileRoutes);

app.use("/logout", logoutRoutes);

app.use("/post", postBlog);

app.use("/post", retrieveBlog);

app.use("/post", singleBlog);

app.get("*", (req, res) => res.sendFile(path.resolve("build", "index.html")));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
