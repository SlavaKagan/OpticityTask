import express from 'express';
import 'reflect-metadata';
import assignmentRoutes from './routes/assignmentRoutes';
import { initializeDatabase } from './database/connection';


const app = express();
app.use(express.json());

initializeDatabase().then(() => {
    console.log('Connected to MongoDB');
    app.use('/api', assignmentRoutes);
});

export default app;