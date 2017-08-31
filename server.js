const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const path = require("path");
const fs = require("fs");

const indexRoutes = require("./routes/indexRoutes");
const todoRoutes = require("./routes/todoRoutes");

const models = require("./models");

const port = process.env.PORT || 8000;

const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use("/", indexRoutes);
app.use("/todo", todoRoutes);

const todo = models.todo;

let data = {};

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
