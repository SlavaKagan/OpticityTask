import { getMongoRepository } from 'typeorm';
import { Assignment } from '../models/assignmentModel';

export class AssignmentService {
    private assignmentRepository = getMongoRepository(Assignment);

    constructor() {
        this.assignmentRepository = getMongoRepository(Assignment);
    }

    async getAssignments() {
        return await this.assignmentRepository.find({
            order: { createdAt: 'DESC' },
            take: 10,
        });
    }

    async createAssignment(name: string, description: string) {
        const assignment = new Assignment(name, description);
        return await this.assignmentRepository.save(assignment);
    }

    async updateAssignment(id: string, name: string) {
        const assignment = await this.assignmentRepository.findOne({ where: { id } });
        if (assignment) {
            assignment.name = name;
            return await this.assignmentRepository.save(assignment);
        }
        throw new Error('Assignment not found');
    }

    async deleteDescription(id: string, descriptionIndex: number) {
        const assignment = await this.assignmentRepository.findOne({ where: { id } });
        if (assignment) {
            assignment.descriptionHistory.splice(descriptionIndex, 1);
            return await this.assignmentRepository.save(assignment);
        }
        throw new Error('Assignment not found');
    }

    async addDescription(id: string, description: string) {
        const assignment = await this.assignmentRepository.findOne({ where: { id } });
        if (assignment) {
            assignment.descriptionHistory.push(description);
            return await this.assignmentRepository.save(assignment);
        }
        throw new Error('Assignment not found');
    }
}