/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default {
    login: (username, password) => api.post('/login', { username, password }),
    getAssignments: (page) => api.get(`/assignments?page=${page}`),
    getDescriptions: (assignmentId) => api.get(`/assignments/${assignmentId}/descriptions`),
    addDescription: (assignmentId, text) => api.post(`/assignments/${assignmentId}/descriptions`, { text }),
    deleteDescription: (assignmentId, descriptionId) => api.delete(`/assignments/${assignmentId}/descriptions/${descriptionId}`),
};
