import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { AUTH_NO_AUTHORIZED } from "../../errors/auth.error";
import { ROLE_NO_AUTHORITY } from '../../errors/role.error';

enum Role {
  Admin = "admin",
  User = "user"
}

export class RoleMiddleware {

  static MustBeAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      if (req.user!.role !== Role.Admin) throw ROLE_NO_AUTHORITY
      next();
  
    } catch (e) {
      next(ROLE_NO_AUTHORITY)
    }
  }

}