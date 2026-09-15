import express from 'express';
import cors from 'cors';
import authRoutes from './features/auth/auth.routes.js'
import todoRoutes from './features/todos/todo.routes.js';

const app = express();


app.use(express.json()); // Responsible for express middleware req's, res's , next() etc... without it... POST/PATCH/PUT cannot read.
app.use(cors()); // Responsible for the origin connections... cors owns this communcation between localHost:5173 and localhost:3000
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

export default app;