import React, { useState, useEffect } from 'react';
import AssignmentList from './components/AssignmentList';
import LoginForm from './components/LoginForm';
import api from './services/api';
import Cookies from 'js-cookie';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async (username, password) => {
        try {
            const response = await api.login(username, password);
            if (response.data.token) {
                Cookies.set('token', response.data.token, { expires: 2 }); // Token expires in 2 days
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token'); // Get token from cookies
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