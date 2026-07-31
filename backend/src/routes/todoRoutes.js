const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const { validateTodo, validateId } = require('../middleware/validate');

router.get("/", todoController.getAllTodos);
router.post("/", validateTodo, todoController.createTodo);
router.put("/:id", validateId, todoController.updateTodo);
router.delete("/:id", validateId, todoController.deleteTodo);

module.exports = router;
