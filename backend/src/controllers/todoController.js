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
    }
};

module.exports = todoController;