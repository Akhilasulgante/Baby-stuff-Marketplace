const express = require("express");
const router = express.Router();
const databaseManager = require("../db/MyMongoDB");
const { ObjectId } = require("mongodb");

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

// Create new Post
router.post("/", upload.array("images"), async (req, res) => {
    let postId = "";

    let data = { ...req.body };

    data.images = req.files.map((f) => {
        return f.path;
    });
    try {
        postId = await databaseManager.create("posts", data);
    } catch (err) {
        statusCode = 500;
        data.message = err.message;
    }
    console.log("postId: ", postId.toString());
    res.status(statusCode).send(JSON.stringify({ postId: postId.toString() }));
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
