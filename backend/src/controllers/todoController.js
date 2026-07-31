const db = require('../models/index.js');
const { Todo } = db;

const todoController = {
    // GET /todos - LIST ALL TODOS
    async getAllTodos(req, res) {
        try {
            const todos = await Todo.findAll({
                order: [['createdAt', 'DESC']]
            });
            return res.status(200).json(todos);
        } catch (error) {
            return res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    },

    // POST /todos - CREATE A NEW TODO
    async createTodo(req, res) {
        try {
            const { title, description, completed } = req.body;

            if (!title) {
                return res.status(400).json({
                    error: 'Validation Error',
                    message: 'Title is required'
                });
            }

            const todo = await Todo.create({
                title: title.trim(),
                description: description || null,
                completed: completed || false
            });

            return res.status(201).json(todo);
        } catch (error) {
            return res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    },

    // PUT /todos/:id - UPDATE A TO DO
    async updateTodo(req, res) {
        try {
            const { id } = req.params;
            const { title, description, completed } = req.body;

            const todo = await Todo.findByPk(id);
            if (!todo) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: `Todo with ID ${id} not found`
                });
            }

            // Update only provided fields
            if (title !== undefined) todo.title = title.trim();
            if (description !== undefined) todo.description = description;
            if (completed !== undefined) todo.completed = completed;

            await todo.save();
            return res.status(200).json(todo);
        } catch (error) {
            return res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    },

    // DELETE /todos/:id - DELETE A TO DO
    async deleteTodo(req, res) {
        try {
            const { id } = req.params;

            const todo = await Todo.findByPk(id);
            if (!todo) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: `Todo with ID ${id} not found`
                });
            }

            await todo.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }
};

module.exports = todoController;