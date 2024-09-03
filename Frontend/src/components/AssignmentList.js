import React, { useState, useEffect } from 'react';
import AssignmentItem from './AssignmentItem';
import api from '../services/api';

function AssignmentList() {
    const [assignments, setAssignments] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await api.getAssignments(page);
                setAssignments(response.data);
            } catch (error) {
                console.error('Failed to fetch assignments:', error);
            }
        };

        fetchAssignments();
    }, [page]);

    return (
        <div>
            {assignments.map(assignment => (
                <AssignmentItem key={assignment._id} assignment={assignment} />
            ))}
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
}

export default AssignmentList;
