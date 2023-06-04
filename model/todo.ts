import { Schema, model } from 'mongoose';
import { ITodo } from '../interface/todo';

const todoSchema = new Schema<ITodo> ({
  title: { type: String, required: true },
  content: {type: String, required: true},
  userId: { type: Schema.Types.ObjectId, required: true , ref: 'User'}
})

export const Todo = model<ITodo>('Todo', todoSchema);