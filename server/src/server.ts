import app from './app.js';
import { env } from './config/env.js';
import pool from './config/database.js';


const PORT = env.port;

async function checkConnection(): Promise<void>{
    try {
        await pool.query('SELECT 1');
        console.log('Connection Established');
        return;

    } catch(error){
        console.error('Database Connection Failed.', error);
        process.exit(1);
    }
}


await checkConnection();

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

