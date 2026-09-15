import dotenv from 'dotenv';

dotenv.config();


function verifyStringEnv(key: string): string {
    const value = process.env[key];

    if(value === undefined || value === ''){
        throw new Error(`Environment Variable ${key} is missing!`);
    }

    return value
};

function verifyNumberEnv(key: string): number {
    const value = process.env[key];

    if(value === undefined || value === ''){
        throw new Error(`Environment Variable ${key} is missing!`);
    }

    const parseNumber = Number(value);
    if(!Number.isFinite(parseNumber)){
        throw new Error(`Environment Variable configuration error: ${key} must be a valid number, got "${value}"`);
    }

    return parseNumber;
};



export const env = {
    port: verifyNumberEnv('PORT'),
    dbHost: verifyStringEnv('DB_HOST'),
    dbPort: verifyNumberEnv('DB_PORT'),
    dbUser: verifyStringEnv('DB_USER'),
    dbPassword: verifyStringEnv('DB_PASSWORD'),
    dbName: verifyStringEnv('DB_NAME'),
    jwtSecret: verifyStringEnv('JWT_SECRET')
};