import { Document, Types } from "mongoose";

export interface ITodo extends Document {
  title: string;
  content: string;
  userId: Types.ObjectId;
}