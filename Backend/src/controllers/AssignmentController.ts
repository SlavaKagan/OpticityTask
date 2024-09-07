import { Request, Response } from 'express';
import { AssignmentService } from '../services/AssignmentService';

export class AssignmentController {
    private assignmentService = new AssignmentService();

    async getAssignments(req: Request, res: Response) {
        console.log('GET /assignments');
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        console.log(`Page: ${page}, Limit: ${limit}`);
        try {
            const assignments = await this.assignmentService.getAssignments(page, limit);
            const totalCount = await this.assignmentService.getAssignmentsCount();
            res.json({ assignments, totalCount });
        } catch (error) {
            return res.status(500).json({ message: 'An error occurred', error: error.message });
        }
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
        console.log('DELETE /assignments/:id/:descriptionIndex');
        const { id, descriptionIndex } = req.params;
        try {
            const deleteDescriptionAssignment= await this.assignmentService.deleteDescription(id, parseInt(descriptionIndex, 10));
            if (!deleteDescriptionAssignment) {
                return res.status(404).json({ message: 'Description not found' });
            }
            res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    }

    async getAssignmentById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const assignment = await this.assignmentService.getAssignmentById(id);
            if (!assignment) {
                return res.status(404).json({ message: 'Assignment not found' });
            }
            res.status(200).json(assignment);
        } catch (error) {
            return res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    }

    async addDescription(req: Request, res: Response) {
        console.log('POST /assignments/:id');
        const { id } = req.params;
        const { description } = req.body;
        try {
            const updatedAssignment = await this.assignmentService.addDescription(id, description);
            if (!updatedAssignment) {
                return res.status(404).json({ message: 'Assignment not found' });
            }
            return res.status(200).json(updatedAssignment);
        } catch (error) {
            return res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    }
}
