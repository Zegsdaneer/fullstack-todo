import * as todoValidation from './todo.validation.js';
import * as todoRepository from './todo.respository.js';
import type { Todo, CreateToDoInput , UpdateToDoInput} from './todo.types.js';


export async function AllTodos(id: number) {
    const userId = id;
    const allTodos = await todoRepository.findtodoByUserId(userId);

    return allTodos;
}

export async function TodosByTodoId(userid: number, todoid: number) {
    const todosById = await todoRepository.findTodoById(userid, todoid);

    return todosById;
}

export async function createTodoService(id: number, input: CreateToDoInput): Promise<Todo> {
    const cleanInput = todoValidation.validateCreateToDo(input);

    const newTodo = await todoRepository.createTodoQuery(id, cleanInput);

    return newTodo;
}

export async function updateToDoService(userid: number, todoid: number, input: UpdateToDoInput): Promise<Todo> {
    const cleanInput = todoValidation.validateUpdateToDo(input);
    const patchTodo = await todoRepository.updateTodoQuery(userid, todoid, cleanInput);
    if(!patchTodo){
        throw new Error(`Todo with ID ${todoid} not found for user ${userid}`);
    }

    return patchTodo;
}


export async function deleteToDoService(userid: number, todoid: number){
    return todoRepository.deleteToDQuery(userid, todoid);
}

