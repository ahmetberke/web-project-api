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

  register = async (req: Request, res: Response, next: NextFunction) => {

    try {

      const registerPayload = req.body as RegisterDTO;
      const registeredUser = await this.userService.create(registerPayload as User);
      
      const token = GenerateToken(registeredUser.id, registeredUser.username, registeredUser.email, registeredUser.role);

      const response = SuccessCreateResponse("kullanıcı başarıyla oluşturuldu", {
        user: UserToUserDTO(registeredUser),
        token
      });

      res.status(response.code).json(response);

    }catch (e) {
      next(e)
    }

  }

  login = async (req: Request, res: Response, next: NextFunction) => {

    try {

      const loginPayload = req.body as RegisterDTO;
      const loggedUser = await this.userService.findByEmail(loginPayload.email);
      
      const isPasswordCorrect = await validatePassword(loginPayload.password, loggedUser.password)
      if (!isPasswordCorrect) {
        throw AUTH_WRONG_PASSWORD_ERROR
      }

      const token = GenerateToken(loggedUser.id, loggedUser.username, loggedUser.email, loggedUser.role);

      const response = SuccessResponse("Başarıyla giriş yaptınız", {
        user: UserToUserDTO(loggedUser),
        token
      });

      res.status(response.code).json(response);

    }catch (e) {
      next(e)
    }

  }

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.findById(req.user!._id);
      const response = SuccessResponse("Kullanıcı başarıyla getirildi", UserToUserDTO(user));
      res.status(response.code).json(response);
    } catch (e) {
      next(e)
    }   
  }

  checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = SuccessResponse("bu bir admin işlemi, yetkiniz tam", null);
      res.status(response.code).json(response);
    } catch(e) {
      next(e)
    }
  }

}