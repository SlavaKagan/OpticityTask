import { createConnection } from 'typeorm';
import { Assignment } from '../models/assignmentModel';

export const initializeDatabase = async () => {
    try {
        await createConnection({
            type: 'mongodb',
            url: 'mongodb://localhost:27017/OpticityTask',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            entities: [Assignment],
            synchronize: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit the process with an error code
    }
};
