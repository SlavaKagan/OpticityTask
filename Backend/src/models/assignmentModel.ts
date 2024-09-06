import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Assignment {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    name: string;

    @Column('array')
    descriptionHistory: string[];

    @Column()
    createdAt: Date;

    constructor(name: string, description: string) {
        this.name = name;
        this.descriptionHistory = [description];
        this.createdAt = new Date();
    }
}