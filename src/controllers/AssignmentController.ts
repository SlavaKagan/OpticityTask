import { Request, Response } from 'express';
import { AssignmentService } from '../services/AssignmentService';

export class AssignmentController {
    private assignmentService = new AssignmentService();

    async getAssignments(req: Request, res: Response) {
        const assignments = await this.assignmentService.getAssignments();
        res.json(assignments);
    }

    async createAssignment(req: Request, res: Response) {
        const { name, description } = req.body;
        const assignment = await this.assignmentService.createAssignment(name, description);
        res.status(201).json(assignment);
    }

    async updateAssignment(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;
        const updatedAssignment = await this.assignmentService.updateAssignment(id, name);
        res.json(updatedAssignment);
    }

    async deleteDescription(req: Request, res: Response) {
        const { id, descriptionIndex } = req.params;
        await this.assignmentService.deleteDescription(id, parseInt(descriptionIndex, 10));
        res.status(204).send();
    }

    async addDescription(req: Request, res: Response) {
        const { id } = req.params;
        const { description } = req.body;
        const updatedAssignment = await this.assignmentService.addDescription(id, description);
        res.json(updatedAssignment);
    }
}
