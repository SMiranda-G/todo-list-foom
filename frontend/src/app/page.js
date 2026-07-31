'use client';

import { useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Groceries', description: 'Veggies, Milk, Tea, Coffee, Bread', completed: false }
  ]);

  const handleCreate = (title, description) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggleComplete = (id, completed) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>Todo Tracker</h1>
      <TodoForm onSubmit={handleCreate} />
      <TodoList
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />
    </div>
  );
}