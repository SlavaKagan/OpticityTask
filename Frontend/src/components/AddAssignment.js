import React, { useState } from 'react';
import api from '../services/api';

function AddAssignment({ onAssignmentAdded }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.addAssignment(name, description);
            if (response.data) {
                onAssignmentAdded();
                setName('');
                setDescription('');
            }
        } catch (error) {
            console.error('Error adding assignment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="assignmentName">Assignment Name</label>
                <input
                    type="text"
                    id="assignmentName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="assignmentDescription">Assignment Description</label>
                <textarea
                    id="assignmentDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Assignment</button>
        </form>
    );
}

export default AddAssignment;
