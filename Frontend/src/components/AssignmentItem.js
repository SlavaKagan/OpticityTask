import React, { useState } from 'react';
import DescriptionModal from './DescriptionModal';
import './AssignmentItem.css'; // Import the CSS file for styles

function AssignmentItem({ assignment }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsModalOpen(true);
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
                />
            )}
        </div>
    );
}

export default AssignmentItem;
