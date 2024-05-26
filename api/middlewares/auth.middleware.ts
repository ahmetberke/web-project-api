import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { AUTH_NO_AUTHORIZED } from "../../errors/auth.error";

export class AuthMiddleware {

  static Authorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) throw AUTH_NO_AUTHORIZED
      const decoded = jwt.verify(token, process.env.SECRET_KEY!) as {
        _id: string;
        username: string;
        email: string;
        exp: number;
        role: string
      };
      if (decoded.exp > Date.now()) throw AUTH_NO_AUTHORIZED
      req.user = {
        _id: decoded._id,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role
      };
      
      next();
  
    } catch (e) {
      next(AUTH_NO_AUTHORIZED)
    }
  }

}