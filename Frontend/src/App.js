import React, { useState, useEffect } from 'react';
import AssignmentList from './components/AssignmentList';
import LoginForm from './components/LoginForm';
import AddAssignment from './components/AddAssignment';
import api from './services/api';
import Cookies from 'js-cookie';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async (username, password) => {
        try {
            const response = await api.login(username, password);
            if (response.data.token) {
                const expires = new Date();
                expires.setHours(expires.getHours() + 2);
                Cookies.set('token', response.data.token, { expires });
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <AddAssignment onAssignmentAdded={() => window.location.reload()} />
                    <AssignmentList />
                </>
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
