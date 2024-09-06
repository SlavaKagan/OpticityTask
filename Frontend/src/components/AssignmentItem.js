import React, { useState } from 'react';
import DescriptionModal from './DescriptionModal';
import './AssignmentItem.css'; // Import the CSS file for styles

function AssignmentItem({ assignment, onAssignmentUpdated }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleAssignmentUpdated = (updatedAssignment) => {
        onAssignmentUpdated(updatedAssignment); // Notify parent about the update
        setIsModalOpen(false); // Close the modal after update
    };

    return (
        <div className="assignment-item">
            <div className="assignment-content">
                <h3>{assignment.name}</h3>
                <button className="edit-button" onClick={handleEditClick}>Edit</button>
            </div>
            {isModalOpen && (
                <DescriptionModal
                    assignment={assignment}
                    onClose={() => setIsModalOpen(false)}
                    onAssignmentUpdated={handleAssignmentUpdated}
                />
            )}
        </div>
    );
}

export default AssignmentItem;
