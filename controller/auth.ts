import { Request, Response, NextFunction } from 'express';
import { User } from '../model/user';
import bcrypt from 'bcrypt';
import generateToken  from '../config/generateToken';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return next({ statusCode: 401, message: 'User already Exist' });  
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const createdUser = new User({ email, password: hash });
    const user = await createdUser.save();
    
    if (user) {
      const { password, ...others } = user.toObject();
      const token = generateToken(user._id.toString());
  
      res.status(200).json({token,...others});
    }
  } catch (err) {
    next(err);
  }
};


export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const user = await User.findOne({email: req.body.email});
    if(!user){
      return next({ statusCode: 401, message: 'no existing user' });
    }
    const isCorrect:boolean = await bcrypt.compare(req.body.password, user.password);
    if(!isCorrect){
      return next({status: 401, message:'Wrong Password'})
    }
    const { password, ...others } = user.toObject();
    const token = generateToken(user._id.toString());
    res.status(200).json({token,...others});

  } catch(err){
    next(err);
  }

}