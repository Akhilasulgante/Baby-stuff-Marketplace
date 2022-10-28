const express = require("express");
const router = express.Router();
const path = require("path");

// By Zhiyi Jin
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

// By Zhiyi Jin
// Get post with id
router.get("/posts/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/postDetail.html"));
});

module.exports = router;
