import { Pool } from 'pg';
import dotenv from 'dotenv';
import { databaseHost, databaseUser, databasePassword, databasePort, databaseName } from '../settings';
dotenv.config();

// export const pool = new Pool({ connectionString });
export const pool = new Pool({ host: databaseHost, user: databaseUser, password: databasePassword, port: databasePort, database: databaseName });