import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import assignmentRoutes from './routes/assignmentRoutes';

const app = express();
app.use(express.json());

createConnection().then(() => {
    console.log('Connected to MongoDB');
    app.use('/api', assignmentRoutes);
});

export default app;