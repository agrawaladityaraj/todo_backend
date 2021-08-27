const express = require("express");
const {
  addTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/Todo.controller");
const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const router = express.Router();

router.post(
  "/add",
  [
    body("title", "Title is required.").isString().notEmpty(),
    body("completed", "Completed status is required.").isBoolean().notEmpty(),
  ],
  addTodo
);

router.put(
  "/edit/:id",
  [
    body("title", "Title is required.").isString().notEmpty(),
    body("completed", "Completed status is required.").isBoolean().notEmpty(),
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
  ],
  editTodo
);

router.delete(
  "/delete/:id",
  [
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
  ],
  deleteTodo
);

module.exports = router;
