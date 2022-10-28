const express = require("express");
const router = express.Router();
const databaseManager = require("../db/db");

// By Zhiyi Jin
// Read all posts
router.get("/", async (req, res) => {
  let data;
  let methodChain = {
    limit: [50],
    sort: [{ createdAt: -1 }],
  };
  try {
    data = await databaseManager.read("posts", {}, methodChain);
  } catch (err) {
    statusCode = 500;
    res.send(err);
  }
  res.send(JSON.stringify(data));
});

// By Zhiyi Jin
// create default post
router.get("/createDefaultPosts", async function (req, res) {
  let statusCode = 200;
  try {
    await databaseManager.createDefaultPosts("posts");
  } catch (err) {
    statusCode = 500;
  }
  res.status(statusCode).send("");
});

module.exports = router;
