import { createConnection } from 'typeorm';
import { Assignment } from '../models/assignmentModel';

export const initializeDatabase = async () => {
    try {
        await createConnection({
            type: 'mongodb',
            url: 'mongodb://localhost:27017/OpticityTask',
            entities: [Assignment],
            synchronize: true,
            name: 'default',
            useNewUrlParser: true,
            useUnifiedTopology: true, 
       
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};
