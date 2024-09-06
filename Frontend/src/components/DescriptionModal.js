import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './DescriptionModal.css'; // Import the CSS file for styles

function DescriptionModal({ assignment, onClose, onAssignmentUpdated }) {
    const [descriptions, setDescriptions] = useState([]);
    const [newDescription, setNewDescription] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [updatedName, setUpdatedName] = useState(assignment.name);

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

    const handleUpdateAssignmentName = async () => {
        try {
            const response = await api.updateAssignment(assignment._id, updatedName);
            if (response.data) {
                onAssignmentUpdated(response.data); // Notify parent about the update
                setEditMode(false); // Exit edit mode after successful update
            }
        } catch (error) {
            console.error('Failed to update assignment name:', error);
        }
    };

    return (
        <div className="modal">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>Descriptions for {assignment.name}</h2>
            {editMode ? (
                <div className="edit-name">
                    <input
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                    <button onClick={handleUpdateAssignmentName}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            ) : (
                <button className="edit-button" onClick={() => setEditMode(true)}>Edit Name</button>
            )}
            <ul>
                {descriptions.map(desc => (
                    <li key={desc._id}>
                        {desc.text}
                        <button className="delete-button" onClick={() => handleDeleteDescription(desc._id)}>🗑️</button>
                    </li>
                ))}
            </ul>
            <div className="add-description">
                <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Add new description"
                />
                <button onClick={handleAddDescription}>Add</button>
            </div>
        </div>
    );
}

export default DescriptionModal;
