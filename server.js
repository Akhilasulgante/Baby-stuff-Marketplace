const express = require("express");
const app = express();

const indexRouter = require("./routes/index");

app.set("views", __dirname + "/views");
app.set("layour", "layouts/layout");

app.use(express.static("public"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
