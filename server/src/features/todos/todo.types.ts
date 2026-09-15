export interface Todo {
    todo_id: number,
    user_id: number,
    title: string,
    is_completed: boolean,
    created_at: string,
    updated_at: string
};


export interface CreateToDoInput {
    title: string
};

export interface UpdateToDoInput {
    title?: string,
    is_completed?: boolean
}




