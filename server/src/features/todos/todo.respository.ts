import pool from '../../config/database.js';
import type { Todo, CreateToDoInput , UpdateToDoInput} from './todo.types.js';


export async function findtodoByUserId (id: number): Promise<Todo[]> {
    const row = await pool.query(`
        SELECT *
        FROM todos
        WHERE user_id = $1`,
    [id]);

    return row.rows;
}


export async function findTodoById (userid: number, todoid: number): Promise<Todo | null> {
    const row = await pool.query(`
        SELECT *
        FROM todos
        WHERE user_id = $1 AND todo_id = $2;`,
    [userid, todoid]);

    return row.rows[0] ?? null;
}

export async function createTodoQuery (id: number, input: CreateToDoInput): Promise<Todo> {
    const row = await pool.query(`
        INSERT INTO todos ( user_id, title)
        VALUES ($1, $2)
        RETURNING *;`,
    [id, input.title]);

    return row.rows[0];
}

export async function updateTodoQuery (id: number, todoid: number, input: UpdateToDoInput): Promise<Todo | null> {
    const row = await pool.query(`
        UPDATE todos
        SET title = COALESCE($1, title),
        is_completed = COALESCE($2, is_completed),
        updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $3 AND todo_id = $4
        RETURNING *`,[
            input.title ?? null,
            input.is_completed ?? null,
            id, 
            todoid
        ]);

        return row.rows[0];
}

export async function deleteToDQuery (userid: number, todoid: number): Promise<boolean> {
    const row = await pool.query(`
        DELETE FROM todos
        WHERE user_id = $1 AND todo_id = $2;`,[
            userid, todoid
        ]);
        return row.rowCount === 1;
}