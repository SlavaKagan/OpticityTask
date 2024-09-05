/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
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
