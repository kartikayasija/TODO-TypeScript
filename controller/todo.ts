import { Request, Response, NextFunction } from 'express';
import { ITodo } from '../interface/todo';
import { Todo } from '../model/todo';

export const getAllTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const todos: ITodo[] = await Todo.find({userId: res.locals.userId});
    res.status(200).json(todos);
  } catch(err){
    next(err);
  }
}

export const getTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const {id} = req.params
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch(err){
    next(err);
  }
}

export const createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const newTodo = new Todo({...req.body, userId: res.locals.userId});
    const todo = await newTodo.save();
    res.status(200).json(todo);
  } catch(error){
    next(error);
  }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const {id} = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if(todo===null) return next({ statusCode: 400, message: 'Does not Exist' })

    res.status(200).json(todo);
    
  } catch(error){
    next(error)
  }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const {id} = req.params;
    const newTodo = await Todo.findByIdAndUpdate(id, req.body,{ new: true })
    if(!newTodo) return next({ statusCode: 400, message: 'Does not Exist' })
    res.status(200).json(newTodo);
  } catch(error){
    next(error)
  }
}

