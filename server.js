const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 8000;

const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

let todos = [{ todo: "Clean chicken coop" }, { todo: "Feed the Dog" }];
let completed = [];

app.get("/", (req, res) => {
  res.render("index", { todos: todos, completed: completed });
});

app.post("/addItem", (req, res) => {
  todos.push(req.body);
  res.redirect("/");
});

app.post("/completeItem", (req, res) => {
  todos.forEach((item, index) => {
    if (req.body.removeItem == todos[index].todo) {
      let addItem = todos[index];
      todos.splice(index, 1);
      completed.push(addItem);
    }
  });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
