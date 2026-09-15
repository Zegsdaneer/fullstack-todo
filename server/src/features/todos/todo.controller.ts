import type { Request,  Response} from 'express';
import * as TodoService from '../todos/todo.service.js';
import { isNumber } from '../../utils/helper.js';


export async function getAllToDos (req: Request, res: Response): Promise<void> {
    try {
        const userId = req.userId;
        if(!userId){
            res.status(401).send('Unathorized');
            return;
        }

        const result = await TodoService.AllTodos(userId)

        res.status(200).json(result);

    } catch(error: any){
        console.error(error);
        res.status(500).send('Unexpected server failure');
    }
}

export async function getToDosById (req: Request, res: Response): Promise<void> {
    try {
        const userId = req.userId;
        const todoId = Number(req.params.id);


        if(!userId){
            res.status(401).send('Unathorized');
            return;
        }
        if(!isNumber(todoId)){
            res.status(400).send('Bad Request 1');
        }
        if(todoId === undefined){
            res.status(401).send('Not Found');
            return;
        }
        if(!isNumber(todoId)){
            res.status(400).send('Bad Request 2');
            return;
        }

        const result = await TodoService.TodosByTodoId(userId, todoId);

        res.status(200).json(result);

    } catch(error: any){
        console.error(error);
        res.status(500).send('Unexpected server failure');
    }
}

export async function createToDo (req: Request, res: Response): Promise<void> {
    try {
        const userId = req.userId;
        const { title } = req.body;

        if(!userId){
            res.status(401).send('Unathorized');
            return;
        }
        const result = await TodoService.createTodoService(userId, { title });
        res.status(201).json(result);

    } catch(error: any){
        console.error(error);
        if(error.message === 'Input cannot be empty'){
            res.status(400).send('Fix Validation.ts');
            return;
        }
        res.status(500).send('Unexpected server failure');
    }
}

export async function updateToDo (req: Request, res: Response): Promise<void> {
    try {
        const userId = req.userId;
        const todoId = Number(req.params.id);
        const { title, is_completed } = req.body;

        if(!userId){
            res.status(401).send('Unathorized');
            return;
        }
        if(!isNumber(todoId)){
            res.status(400).send('Bad Request');
            return;
        }
        if(!todoId){
            res.status(404).send('Not Found');
            return;
        }

        const result = await TodoService.updateToDoService(userId, todoId, {
            title, is_completed
        })

        if(!result){
            res.status(404).send('Not Found');
            return
        }



        res.status(200).json(result);

    }catch(error: any){
        console.error(error);
        if(error.message === 'Input cannot be empty'){
            res.status(400).send('Check Validation or Repository 1');
            return;
        }
        if(error.message === 'Invalid credentials'){
            res.status(400).send('Check Validation or Repository 2');
            return;
        }
        res.status(500).send('Unexpected Server Failure');
    }
}

export async function deleteToDo (req: Request, res: Response): Promise<void> {
    try {
        const userId = req.userId;
        const todoId = Number(req.params.id);
        if(!userId){
            res.status(401).send('Unathorized');
            return;
        }
        if(!isNumber(todoId)){
            res.status(400).send('Bad Request');
            return;
        }
        if(!todoId){
            res.status(404).send('Not Found');
            return;
        }

        const result = await TodoService.deleteToDoService(userId, todoId);
        res.status(200).send('Deleted Successfully!');

    } catch(error: any){
        console.error(error);
        res.status(500).send('Unexpected Server Failure');
    }
}