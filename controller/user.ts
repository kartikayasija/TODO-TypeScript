import { Request, Response, NextFunction  } from 'express';
import { User } from '../model/user';
import { IUser } from '../interface/user';

export const getAllUsers=async (req: Request, res: Response, next:NextFunction ): Promise<void>=>{

  try{
    const users: IUser[] = await User.find();
    res.status(200).json(users);
  } catch(err){
    next(err);
  }
  
}

export const getUser=async (req: Request, res: Response, next:NextFunction ): Promise<void>=>{

  const userID:string = req.params.id;
  try{
    const user: IUser | null = await User.findById(userID);
    res.status(200).json(user);
  } catch(err) {
    next(err);
  }

}