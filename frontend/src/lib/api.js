import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
        // Server responded with error
            const message = error.response.data?.error || error.response.data?.message || 'Server error';
            throw new Error(message);
        } else if (error.request) {
            // Request made but no response
            throw new Error('Network error - server not responding');
        } else {
            // Request setup error
            throw new Error(error.message || 'Request failed');
        }
    }
);

export const todoApi = {
    getAllTodos: async () => {
        const response = await api.get('/todos');
        return response.data;
    },

    createTodo: async (data) => {
        const response = await api.post('/todos', data);
        return response.data;
    },

    updateTodo: async (id, data) => {
        const response = await api.put(`/todos/${id}`, data);
        return response.data;
    },

    deleteTodo: async (id) => {
        await api.delete(`/todos/${id}`);
    }
};