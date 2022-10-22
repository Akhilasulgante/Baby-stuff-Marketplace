var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

const postsRouter = require("./routes/posts");
const pagesRouter = require("./routes/pages");
const usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", pagesRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port 3000");
});

module.exports = app;
