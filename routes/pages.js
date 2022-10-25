//By Zhiyi Jin
const express = require("express");
const router = express.Router();
const path = require("path");

// Get all posts page
router.get("/posts", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/postList.html"));
});

module.exports = router;
