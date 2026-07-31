'use client';

import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { todoApi } from '../lib/api';


export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Please make sure the backend is running.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (title, description) => {
    try {
      const newTodo = await todoApi.createTodo({ title, description });
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError('Failed to create todo. Please try again.');
      console.error('Error creating todo:', err);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const updated = await todoApi.updateTodo(id, { completed });
      setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;
    useEffect(() => {
      loadTodos();
    }, []);

  return (
    <div className="container">
      <h1>Todo Tracker</h1>

      {error && <div className="error">{error}</div>}

      <TodoForm onSubmit={handleCreate} />

      {loading ? (
        <div className="loading">Loading todos...</div>
      ) : (
        <>
          <TodoList
            todos={todos}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
          />

          {todos.length > 0 && (
            <div className="stats">
              Total: {todos.length} | Completed: {completedCount} |
              Pending: {todos.length - completedCount}
            </div>
          )}
        </>
      )}
    </div>
  );
}