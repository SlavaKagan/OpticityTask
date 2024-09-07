import React, { useState } from 'react';
import api from '../services/api';

function AddDescriptionForm({ assignmentId, onDescriptionAdded }) {
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.addDescription(assignmentId, description);
            if (response.data) {
                onDescriptionAdded();
                setDescription('');
            }
        } catch (error) {
            console.error('Error adding description:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="description">New Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Description</button>
        </form>
    );
}

export default AddDescriptionForm;