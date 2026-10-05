// This is where import the types, and set up fetch methods
import type { Todo, CreateToDoRequest, UpdateTodoRequest } from "../types/todo"

const url = import.meta.env.VITE_API_URL;




export async function getAllTodos (token: string ): Promise<Todo[]> {
        const response = await fetch(`${url}api/todo/todo`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            if(response.status === 401){
                throw new Error('Unauthorized');
            }
            throw new Error(`HTTP Error! Status: ${response.status}`)
        }

        const data: Todo[] = await response.json();
        return data;
}

export async function getAllTodoById(token: string, id: number): Promise<Todo>{
    const response = await fetch(`${url}api/todo/todo/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
            if(response.status === 401){
                throw new Error('Unauthorized');
            }
            throw new Error(`HTTP Error! Status: ${response.status}`)
    }

    const data: Todo = await response.json();
    return data;
}


export async function createTodo(token: string , payload: CreateToDoRequest): Promise<Todo>{
    const response = await fetch(`${url}api/todo/todo`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(!response.ok){
            if(response.status === 401){
                throw new Error('Unauthorized');
            }
            throw new Error(`HTTP Error! Status: ${response.status}`)
    }

    const data: Todo = await response.json();
    return data;
}

export async function updateTodo(token: string, id: number, payload: UpdateTodoRequest): Promise<Todo>{
    const response = await fetch(`${url}api/todo/todo/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if(!response.ok){
            if(response.status === 401){
                throw new Error('Unauthorized');
            }
            throw new Error(`HTTP Error! Status: ${response.status}`)
    }

    const data: Todo = await response.json();
    return data;
}

export async function deleteTodo(token: string, id: number): Promise<void>{
    const response = await fetch(`${url}api/todo/todo/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
            if(response.status === 401){
                throw new Error('Unauthorized');
            }
            throw new Error(`HTTP Error! Status: ${response.status}`)
    }

} 

