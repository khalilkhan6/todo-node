const express = require("express");
const Todo = require("../models/todo");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/todo", auth, async (req, res) => {
  const todo = new Todo({
    todo: req.body.todo,
    color: req.body.color,
    owner: req.user._id,
  });
  try {
    await todo.save();
    res.status(201).send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/todo", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user._id });
    res.send(todos);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/todo/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (err) {
    res.status(500).send;
  }
});

router.delete("/todo/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch("/todo/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["todo", "color"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const todo = await Todo.findById(req.params.id);
    updates.forEach((update) => (todo[update] = req.body[update]));
    await todo.save();
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
