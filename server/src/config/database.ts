import { Pool } from 'pg';
import { env } from './env.js';

const pool = new Pool({
    host: env.dbHost,
    port: env.dbPort,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbName
});


export default pool;

