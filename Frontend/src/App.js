import React, { useState, useEffect } from 'react';
import AssignmentList from './components/AssignmentList';
import LoginForm from './components/LoginForm';
import api from './services/api';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async (username, password) => {
        try {
            const response = await api.login(username, password);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <div>
            {isAuthenticated ? <AssignmentList /> : <LoginForm onLogin={handleLogin} />}
        </div>
    );
}

export default App;