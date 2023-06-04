import { Router } from "express";
import { createTodo, deleteTodo, getAllTodo, getTodo, updateTodo } from "../controller/todo";

const router = Router();

router
.get('/getAll',getAllTodo)
.get('/get/:id',getTodo)
.post('/create',createTodo)
.delete('/delete/:id',deleteTodo)
.patch('/update/:id',updateTodo)

export default router;