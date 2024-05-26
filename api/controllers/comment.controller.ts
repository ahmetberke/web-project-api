import { UserToUserDTO } from './../dto/user.dto';
import { GenerateToken } from './../../utils/jwt';
import { UserService } from './../../services/users.service';
import dbClient from "../../database/client"
import { NextFunction, Request, Response } from 'express';
import { RegisterDTO } from '../dto/auth.dto';
import { Comment, Post, User } from '@prisma/client';
import { SuccessCreateResponse, SuccessResponse } from '../response/success.response';
import { validatePassword } from '../../utils/secret';
import { AUTH_WRONG_PASSWORD_ERROR } from '../../errors/auth.error';
import { PostService } from '../../services/posts.service';
import { CheckIsValidObjectId } from '../../utils/checks';
import { USER_ID_NOT_VALID } from '../../errors/user.error';
import { POSTS_REQUIRE_USER_ID_ERROR } from '../../errors/post.error';
import { CommentService } from '../../services/comments.service';

export class CommentController {
  
  protected commentService : CommentService;
  constructor() {
    this.commentService = new CommentService(dbClient);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment = req.body as Comment;
      comment.authorId = req.user!._id;
      const createdComment = await this.commentService.create(comment);
      const response = SuccessCreateResponse("Post başarıyla oluşturuldu", createdComment);
      res.status(response.code).json(response);
    } catch(e) {
      next(e);
    }
  }

}