const Todo = require("../models/Todo.model");
const { validationResult } = require("express-validator");

const addTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const { title, completed } = req.body;

    let todoToAdd = new Todo({
      title,
      completed,
    });
    let todo = await todoToAdd.save();

    return res.status(200).json({ info: todo, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const editTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const { title, completed } = req.body;
    const { id } = req.params;

    let updatedTodo = await Todo.findByIdAndUpdate(id, {
      title,
      completed,
    });

    return res.status(200).json({ info: updatedTodo, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const { id } = req.params;

    await Todo.findByIdAndDelete(id);

    return res.status(200).json({ info: "Todo Deleted", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

module.exports = { addTodo, editTodo, deleteTodo };
