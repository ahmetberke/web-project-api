import { UserToUserDTO } from './../dto/user.dto';
import { GenerateToken } from './../../utils/jwt';
import { UserService } from './../../services/users.service';
import dbClient from "../../database/client"
import { NextFunction, Request, Response } from 'express';
import { RegisterDTO } from '../dto/auth.dto';
import { User } from '@prisma/client';
import { SuccessCreateResponse, SuccessResponse } from '../response/success.response';
import { validatePassword } from '../../utils/secret';
import { AUTH_WRONG_PASSWORD_ERROR } from '../../errors/auth.error';

export class AuthController {
  
  protected userService : UserService;
  constructor() {
    this.userService = new UserService(dbClient);
  }

}