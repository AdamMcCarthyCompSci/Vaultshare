import dotenv from 'dotenv';
dotenv.config();
export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const databaseHost = process.env.DATABASE_HOST;
export const databaseUser = process.env.DATABASE_USER;
export const databasePassword = process.env.DATABASE_PASSWORD;
export const databasePort = process.env.DATABASE_PORT;
export const databaseName = process.env.DATABASE_NAME;
export const sessionSecret = process.env.SESSION_SECRET;