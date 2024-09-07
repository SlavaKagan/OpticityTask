import React, { useState, useEffect } from 'react';
import AssignmentItem from './AssignmentItem';
import api from '../services/api';
import DescriptionModal from './DescriptionModal';

function AssignmentList() {
    const [assignments, setAssignments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.getAssignments(page);
                if (response.data) {
                    setAssignments(response.data.assignments || []);
                    setTotalPages(Math.ceil(response.data.totalCount / 10));
                } else {
                    setAssignments([]);
                }
            } catch (err) {
                console.error('Failed to fetch assignments:', err);
                setError('Failed to fetch assignments. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [page]);

    const handleAssignmentUpdated = (updatedAssignment) => {
        setAssignments(assignments.map(assignment =>
            assignment._id === updatedAssignment._id ? updatedAssignment : assignment
        ));
        setSelectedAssignment(null);
    };

    if (loading) {
        return <p>Loading assignments...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {assignments.length > 0 ? (
                assignments.map((assignment) => (
                    <AssignmentItem
                        key={assignment._id}
                        assignment={assignment}
                        onAssignmentUpdated={handleAssignmentUpdated}
                        setSelectedAssignment={setSelectedAssignment}
                    />
                ))
            ) : (
                <p>No assignments found.</p>
            )}
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>Next</button>
            </div>
            <p>Page {page} of {totalPages}</p>

            {selectedAssignment && (
                <DescriptionModal
                    assignment={selectedAssignment}
                    onClose={() => setSelectedAssignment(null)}
                    onAssignmentUpdated={handleAssignmentUpdated}
                />
            )}
        </div>
    );
}

export default AssignmentList;
