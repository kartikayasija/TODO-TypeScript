import { Request, Response, NextFunction } from "express";
import jwt,{JwtPayload} from "jsonwebtoken";
import { User } from "../model/user";

const verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token; 

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      res.locals.userId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed", error: error });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, No token"});
  }
}; 

export default verify;
