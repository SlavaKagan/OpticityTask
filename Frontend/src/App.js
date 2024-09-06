import React, { useState, useEffect } from 'react';
import AssignmentList from './components/AssignmentList';
import LoginForm from './components/LoginForm';
import AddAssignment from './components/AddAssignment';
import api from './services/api';
import Cookies from 'js-cookie';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [assignments, setAssignments] = useState([]);

    const handleLogin = async (username, password) => {
        try {
            const response = await api.login(username, password);
            if (response.data.token) {
                const expires = new Date();
                expires.setHours(expires.getHours() + 2);
                Cookies.set('token', response.data.token, { expires });
                setIsAuthenticated(true);
                fetchAssignments();
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const fetchAssignments = async () => {
        try {
            const response = await api.getAssignments();
            setAssignments(response.data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    };

    const handleAssignmentAdded = () => {
        fetchAssignments();
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsAuthenticated(true);
            fetchAssignments();
        }
    }, []);

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <AddAssignment onAssignmentAdded={handleAssignmentAdded} />
                    <AssignmentList assignments={assignments} />
                </>
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;