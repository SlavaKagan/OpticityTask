import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { AppDataSource } from './data-source';
import assignmentRoutes from './routes/assignmentRoutes';

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    console.log("Database initialized");
    app.use('/api', assignmentRoutes);
  })
  .catch((error) => console.log(error));


export default app;