import React, { useState } from 'react';
import DescriptionModal from './DescriptionModal';

function AssignmentItem({ assignment }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <h3 onClick={() => setIsModalOpen(true)}>{assignment.name}</h3>
            {isModalOpen && <DescriptionModal assignment={assignment} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default AssignmentItem;
