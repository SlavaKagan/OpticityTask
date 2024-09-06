import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { AppDataSource } from './data-source';
import assignmentRoutes from './routes/assignmentRoutes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    console.log("Database initialized");
    app.use(assignmentRoutes);
  })
  .catch((error) => console.log(error));


export default app;