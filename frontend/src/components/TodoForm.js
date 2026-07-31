'use client';

import { useState } from 'react';

export default function TodoForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            await onSubmit(title.trim(), description.trim());
            setTitle('');
            setDescription('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-group">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="title-input"
                    required
                    disabled={loading}
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (optional)"
                    className="description-input"
                    disabled={loading}
                />
            </div>
            <button
                type="submit"
                className="submit-btn"
                disabled={loading || !title.trim()}
            >
                {loading ? 'Adding...' : 'Add Todo'}
            </button>
        </form>
    );
}