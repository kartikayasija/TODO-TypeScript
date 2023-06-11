import { Schema, model } from 'mongoose';
import { ITodo } from '../interface/todo';

const todoSchema = new Schema<ITodo> ({
  title: { type: String},
  content: {type: String},
  userId: { type: Schema.Types.ObjectId, required: true , ref: 'User'}
})

export const Todo = model<ITodo>('Todo', todoSchema);