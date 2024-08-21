import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Assignment {
    @ObjectIdColumn()
    id: ObjectID = new ObjectID();

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