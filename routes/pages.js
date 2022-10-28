//By Zhiyi Jin
const express = require("express");
const router = express.Router();
const path = require("path");

// Get all posts page
router.get("/posts", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/postList.html"));
});

// By Akhila
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/registration.html"));
});

router.get("/createpost", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/createPost.html"));
});

module.exports = router;
