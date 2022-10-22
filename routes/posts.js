const express = require("express");
const router = express.Router();
const path = require("path");
const databaseManager = require("../db/db");

const multer = require("multer");
const uuid = require("uuid").v4;
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
let statusCode = 200;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Serendipity",
        allowedFormats: ["jpeg", "png", "jpg"],
    },
});

const upload = multer({ storage });

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

// create default post
router.get("/createDefaultPosts", async function (req, res) {
    try {
        await databaseManager.createDefaultPosts("posts");
    } catch (err) {
        statusCode = 500;
    }
    res.status(statusCode).send("");
});

// Create new Post
router.post("/", upload.array("images"), async (req, res) => {
    console.log(req.body, req.files);

    let postId = uuid();
    let data = { ...req.body, _id: postId };

    data.images = req.files.map((f) => {
        return f.path;
    });
    try {
        await databaseManager.create("posts", data);
    } catch (err) {
        statusCode = 500;
        data.message = err.message;
    }
    res.status(statusCode).send(JSON.stringify({ postId: postId }));
});

// Get post with id
router.get("/:id", async (req, res) => {
    let data;
    try {
        data = await databaseManager.read("posts", { _id: req.params.id });
    } catch (err) {
        statusCode = 500;
        res.send(err);
    }
    res.send(JSON.stringify(data));
});

// Delete post with id
router.delete("/:id", async (req, res) => {
    await databaseManager.destroy("posts", { _id: req.params.id });

    res.send(`Deleting post with id: ${req.params.id}`);
});

module.exports = router;
