const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const path = require("path");
const fs = require("fs");

const models = require("./models");

const port = process.env.PORT || 8000;

const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

const todo = models.todo;
let data = {};

app.get("/", (req, res) => {
  todo
    .findAll({ where: { complete: false } })
    .then(todos => {
      data.todos = todos;
    })
    .then(() => {
      todo.findAll({ where: { complete: true } }).then(complete => {
        data.complete = complete;
        res.render("index", data);
      });
    });
});

app.post("/addItem", (req, res) => {
  console.log(req.body.name);
  todo
    .build({
      name: req.body.name,
      complete: false
    })
    .save()
    .then(res.redirect("/"));
});

app.post("/:id", (req, res) => {
  let todoId = req.params.id;
  todo.findOne({ where: { id: todoId } }).then(todo => {
    todo.update({ complete: true }).then(() => {
      res.redirect("/");
    });
  });
});

app.post("/clear", (req, res) => {
  todo.destroy({ where: { complete: true } }).then(() => {
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
