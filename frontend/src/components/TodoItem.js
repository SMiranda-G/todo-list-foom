'use client';

export default function TodoItem({ todo, onToggleComplete, onDelete }) {
    const handleToggle = () => {
        onToggleComplete(todo.id, !todo.completed);
    };

    const handleDelete = () => {
        if (window.confirm(`Delete "${todo.title}"?`)) {
            onDelete(todo.id);
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                    className="todo-checkbox"
                />
                <div className="todo-text">
                    <div className="todo-title">{todo.title}</div>
                    {todo.description && (
                        <div className="todo-description">{todo.description}</div>
                    )}
                </div>
            </div>
            <div className="todo-actions">
                <button onClick={handleDelete} className="delete-btn">
                    Delete
                </button>
            </div>
        </div>
    );
}