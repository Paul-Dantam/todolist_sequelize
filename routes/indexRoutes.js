const express = require("express");
const indexRoutes = express.Router();

const models = require("../models");

const todo = models.todo;

let data = {};

indexRoutes.get("/", (req, res) => {
  todo
    .findAll({
      where: { complete: false },
      order: [["createdAt", "desc"]]
    })
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

indexRoutes.post("/addItem", (req, res) => {
  todo
    .build({
      name: req.body.name,
      complete: false
    })
    .save()
    .then(res.redirect("/"));
});

indexRoutes.post("/:id", (req, res) => {
  let todoId = req.params.id;
  todo.findOne({ where: { id: todoId } }).then(todo => {
    todo.update({ complete: true }).then(() => {
      res.redirect("/");
    });
  });
});

module.exports = indexRoutes;
