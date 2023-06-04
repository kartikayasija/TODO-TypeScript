import { Request, Response, NextFunction } from "express";
import { Error } from "../interface/error";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const statusCode: number = err.statusCode || (res.statusCode===200 ? 500 : res.statusCode);
  const errorMessage: string = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message: errorMessage,
    status : statusCode
  });
};

export default errorHandler;
