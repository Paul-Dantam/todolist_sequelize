const express = require("express");
const todoRoutes = express.Router();
const models = require("../models");
const todo = models.todo;
let data = {};

todoRoutes.post("/edit/:id", (req, res) => {
  let todoId = req.params.id;
  todo.findOne({ where: { id: todoId } }).then(todo => {
    todo.update({ name: req.body.name }).then(() => {
      res.redirect("/");
    });
  });
});

todoRoutes.post("/delete/:id", (req, res) => {
  let todoId = req.params.id;
  todo.findOne({ where: { id: todoId } }).then(todo => {
    todo.destroy({ name: req.body.name }).then(() => {
      res.redirect("/");
    });
  });
});

todoRoutes.post("/clear", (req, res) => {
  todo.destroy({ where: { complete: true } }).then(() => {
    res.redirect("/");
  });
});

module.exports = todoRoutes;
