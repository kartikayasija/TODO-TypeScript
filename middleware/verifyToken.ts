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
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
}; 

export default verify;
