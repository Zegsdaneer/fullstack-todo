import pool from "../../config/database.js";
import type { SignupRequest, SignupResponse, User, UserRequest } from "./auth.types.js";


export async function createUser(input: SignupRequest): Promise<SignupResponse> {
    const row = await pool.query(`
        INSERT INTO users (username, password_hash, first_name, last_name, email_address, phone_number, date_of_birth)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING user_id, username, first_name, last_name, email_address, phone_number, date_of_birth, created_at`,
    [input.username, input.password, input.first_name, input.last_name, input.email_address, input.phone_number, input.date_of_birth]);

    return row.rows[0]
};


export async function findUserByUsername(username: string): Promise<User | null> {
    const row = await pool.query(`
        SELECT *
        FROM users
        WHERE username = $1;`,
    [username]);

    return row.rows[0] ?? null;
};

