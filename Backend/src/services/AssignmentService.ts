import { MongoRepository, MongoEntityManager } from 'typeorm';
import { Assignment } from '../models/assignmentModel';
import { AppDataSource } from "../data-source";
import { ObjectId } from "mongodb";

export class AssignmentService {
    private assignmentRepository: any;

    constructor() {
        this.assignmentRepository = AppDataSource.manager
    }

    async getAssignments(page: number = 1, limit: number = 10): Promise<Assignment[]> {
        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            throw new Error('Invalid page or limit');
        }
        const skip = (page - 1) * limit;
        const assignments= await this.assignmentRepository.find(Assignment,{
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        console.log(`Assignments fetched: ${assignments.length}`);
        return assignments;
    }

    async getAssignmentsCount(): Promise<number> {
        return await this.assignmentRepository.count(Assignment);
    }

    async createAssignment(name: string, description: string): Promise<Assignment | null> {
        const assignment = new Assignment(name, description);
        return await this.assignmentRepository.save(assignment);
    }

    async updateAssignment(id: string, name: string): Promise<Assignment | null> {
        const assignment = await this.assignmentRepository.findOneBy(Assignment, {_id: new ObjectId(id)});
   
        if (!assignment) {
            return null;
        }

        assignment.name = name;
        return await this.assignmentRepository.save(assignment);
    }

    async deleteDescription(id: string, descriptionIndex: number): Promise<Assignment | null> {
        const assignment = await this.assignmentRepository.findOneBy(Assignment, {_id: new ObjectId(id)});
        if (!assignment) {
            return null;
        }
        assignment.descriptionHistory.splice(descriptionIndex, 1);
        return await this.assignmentRepository.save(assignment);
    }

    async addDescription(id: string, description: string) : Promise<Assignment | null> {
        const assignment = await this.assignmentRepository.findOneBy(Assignment, {_id: new ObjectId(id)});
        
        if (!assignment) {
            return null;
        }
        assignment.descriptionHistory.push(description);
        return await this.assignmentRepository.save(assignment);
    }
}