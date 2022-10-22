const express = require("express");
const router = express.Router();
const path = require("path");

// GET landing page.
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/landing.html"));
});

// Get login page
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Get registration page
router.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/registration.html"));
});

// Get all posts page
router.get("/posts", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/postList.html"));
    // res.send("Main post page");
});

//Get Create-post page
router.get("/posts/create-post", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/createPost.html"));
});

// Get post with id
router.get("/posts/:id", (req, res) => {
    // res.send(`Looking at post with id: ${req.params.id}`);
    res.sendFile(path.join(__dirname, "../public/postDetail.html"));
});

module.exports = router;
