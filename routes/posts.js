const express = require("express");
const router = express.Router();
const databaseManager = require("../db/MyMongoDB");
const { ObjectId } = require("mongodb");

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

// By Zhiyi Jin
// Get post with id
router.get("/:id", async (req, res) => {
  let data;
  try {
    data = await databaseManager.read("posts", {
      _id: new ObjectId(req.params.id),
    });
  } catch (err) {
    res.send(err);
  }
  res.json(data);
});

// By Zhiyi Jin
// Delete post with id
router.delete("/:id", async (req, res) => {
  await databaseManager.delete("posts", {
    _id: new ObjectId(req.params.id),
  });

  res.send(`Deleting post with id: ${req.params.id}`);
});

module.exports = router;
