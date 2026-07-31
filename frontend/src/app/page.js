'use client';

import { useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="container">
      <h1>Todo List</h1>
      <p>Building todo app...</p>
    </div>
  );
}