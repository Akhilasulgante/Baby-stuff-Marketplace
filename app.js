//By Zhiyi Jin
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const bodyparser = require("body-parser");

const postsRouter = require("./routes/posts");
const pagesRouter = require("./routes/pages");
const usersRouter = require("./routes/users");
const session = require("express-session");

const app = express();
app.use(session({ secret: "123", cookie: { maxAge: 6000 } }));
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", pagesRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
