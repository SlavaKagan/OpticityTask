/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true,
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
    addAssignment: (name, description) => api.post('/assignments', { name, description }),
    getAssignments: (page) => api.get(`/assignments?page=${page}`),
    addDescription: (assignmentId, description) => api.post(`/assignments/${assignmentId}`, { description }),
    deleteDescription: (assignmentId, descriptionId) => api.delete(`/assignments/${assignmentId}/${descriptionId}`),
};
