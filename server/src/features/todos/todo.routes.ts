import { Router } from "express";
import { checkAuth } from "../../middleware/auth.middleware.js";
import * as todoController from "../todos/todo.controller.js";


const router = Router();

router.get('/todo', checkAuth, todoController.getAllToDos);
router.get('/todo/:id', checkAuth, todoController.getToDosById);
router.post('/todo', checkAuth, todoController.createToDo);
router.patch('/todo/:id', checkAuth, todoController.updateToDo);
router.delete('/todo/:id', checkAuth, todoController.deleteToDo);

export default router;