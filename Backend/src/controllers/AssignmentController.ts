import { Request, Response } from 'express';
import { AssignmentService } from '../services/AssignmentService';

export class AssignmentController {
    private assignmentService = new AssignmentService();

    async getAssignments(req: Request, res: Response) {
        console.log('GET /assignments');
        const assignments = await this.assignmentService.getAssignments(); 
        res.json(assignments);
    }

    async createAssignment(req: Request, res: Response) {
        console.log('POST /assignments');
        const { name, description } = req.body;
        const assignment = await this.assignmentService.createAssignment(name, description);
        res.status(201).json(assignment);
    }

    async updateAssignment(req: Request, res: Response) {
        console.log('PUT /assignments/:id');
        const { id } = req.params;
        const { name } = req.body;
        try {
            const updatedAssignment = await this.assignmentService.updateAssignment(id, name);
            if (!updatedAssignment) {
                return res.status(404).json({ message: 'Assignment not found' });
            }
            return res.status(200).json(updatedAssignment);
        } catch (error) {
            return res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    }

    async deleteDescription(req: Request, res: Response) {
        console.log('DELETE /assignments/:id/descriptions/:descriptionIndex');
        const { id, descriptionIndex } = req.params;
        await this.assignmentService.deleteDescription(id, parseInt(descriptionIndex, 10));
        res.status(204).send();
    }

    async addDescription(req: Request, res: Response) {
        console.log('POST /assignments/:id/descriptions');
        const { id } = req.params;
        const { description } = req.body;
        const updatedAssignment = await this.assignmentService.addDescription(id, description);
        res.json(updatedAssignment);
    }
}
