import express, {Express, Request, Response } from 'express';
import dotenv from "dotenv";
import { connectToMongoDB } from './config/db';
import errorHandler from './middleware/errorHandler';

import userRouter from './routes/user';
import authRouter from './routes/auth';
import todoRouter from './routes/todo';
import verify from './middleware/verifyToken';
const app: Express = express();
dotenv.config();
connectToMongoDB();

app.use(express.json());


app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)  
app.use('/api/todo', verify, todoRouter)  


app.get('/', (req: Request, res: Response) => {
  res.send('Server running');
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server Started!');
});
