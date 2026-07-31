'use client';

import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggleComplete, onDelete }) {
    if (todos.length === 0) {
        return (
            <div className="empty-state">
                <p>No todos yet. Create one above!</p>
            </div>
        );
    }

    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}