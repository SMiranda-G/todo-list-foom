'use client';

import { useState } from 'react';
import TodoForm from '../components/TodoForm';

export default function Home() {
  const [todos, setTodos] = useState([]);

  // Temporary handler
  const handleCreate = (title, description) => {
    console.log('Creating todo:', { title, description });
  };
  
  return (
    <div className="container">
      <h1>Todo Tracker</h1>
      <TodoForm onSubmit={handleCreate} />
      <p style={{ textAlign: 'center', color: '#a0aec0', marginTop: '20px' }}>
        {todos.length === 0 ? 'No todos yet. Create one above!' : 'Todo list coming soon...'}
      </p>
    </div>
  );
}