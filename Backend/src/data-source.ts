import "reflect-metadata";
import { DataSource } from "typeorm";
import { Assignment } from "./models/assignmentModel";

export const AppDataSource = new DataSource({
  type: "mongodb",
  database: "OpticityTask",
  host: "localhost",
  port: 27017,
  synchronize: true,
  logging: false,
  entities: [Assignment],
  migrations: [],
  subscribers: [],
});