import { GenerateToken } from './../../utils/jwt';
import { UserService } from './../../services/users.service';
import dbClient from "../../database/client"
import { NextFunction, Request, Response } from 'express';
import { RegisterDTO } from '../dto/auth.dto';
import { User } from '@prisma/client';
import { SuccessCreateResponse } from '../response/success.response';
import { UserToUserDTO } from '../dto/user.dto';

export class AuthController {
  
  protected userService : UserService;
  constructor() {
    this.userService = new UserService(dbClient);
  }

  register = async (req: Request, res: Response, next: NextFunction) => {

    try {

      const registerPayload = req.body as RegisterDTO;
      const registeredUser = await this.userService.create(registerPayload as User);
      
      const token = GenerateToken(registeredUser.id, registeredUser.username, registeredUser.email);

      const response = SuccessCreateResponse("kullanıcı başarıyla oluşturuldu", {
        user: UserToUserDTO(registeredUser),
        token
      });

      res.status(response.code).json(response);

    }catch (e) {
      next(e)
    }

  }

}