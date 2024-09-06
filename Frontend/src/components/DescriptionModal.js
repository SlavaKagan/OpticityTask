import React, { useState, useEffect } from 'react';
import api from '../services/api';

function DescriptionModal({ assignment, onClose }) {
    const [descriptions, setDescriptions] = useState([]);
    const [newDescription, setNewDescription] = useState('');

    useEffect(() => {
        const fetchDescriptions = async () => {
            try {
                const response = await api.getDescriptions(assignment._id);
                setDescriptions(response.data.descriptionHistory || []);
            } catch (error) {
                console.error('Failed to fetch descriptions:', error);
            }
        };

        if (assignment && assignment._id) {
            fetchDescriptions();
        }
    }, [assignment]);

    const handleAddDescription = async () => {
        try {
            const response = await api.addDescription(assignment._id, newDescription);
            setDescriptions([...descriptions, response.data]);
            setNewDescription('');
        } catch (error) {
            console.error('Failed to add description:', error);
        }
    };

    const handleDeleteDescription = async (descriptionId) => {
        try {
            await api.deleteDescription(assignment._id, descriptionId);
            setDescriptions(descriptions.filter(desc => desc._id !== descriptionId));
        } catch (error) {
            console.error('Failed to delete description:', error);
        }
    };

    return (
        <div className="modal">
            <button onClick={onClose}>X</button>
            <h2>Descriptions for {assignment.name}</h2>
            <ul>
                {descriptions.map(desc => (
                    <li key={desc._id}>
                        {desc.text}
                        <button onClick={() => handleDeleteDescription(desc._id)}>🗑️</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Add new description"
            />
            <button onClick={handleAddDescription}>+</button>
        </div>
    );
}

export default DescriptionModal;
