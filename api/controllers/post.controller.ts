import { UserToUserDTO } from './../dto/user.dto';
import { GenerateToken } from './../../utils/jwt';
import { UserService } from './../../services/users.service';
import dbClient from "../../database/client"
import { NextFunction, Request, Response } from 'express';
import { RegisterDTO } from '../dto/auth.dto';
import { Post, User } from '@prisma/client';
import { SuccessCreateResponse, SuccessResponse } from '../response/success.response';
import { validatePassword } from '../../utils/secret';
import { AUTH_WRONG_PASSWORD_ERROR } from '../../errors/auth.error';
import { PostService } from '../../services/posts.service';
import { CheckIsValidObjectId } from '../../utils/checks';
import { USER_ID_NOT_VALID } from '../../errors/user.error';
import { POSTS_REQUIRE_USER_ID_ERROR } from '../../errors/post.error';

export class PostController {
  
  protected postService : PostService;
  constructor() {
    this.postService = new PostService(dbClient);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = req.body as Post;
      post.authorId = req.user!._id;
      const createdPost = await this.postService.create(post);
      const response = SuccessCreateResponse("Post başarıyla oluşturuldu", createdPost);
      res.status(response.code).json(response);
    } catch(e) {
      next(e);
    }
  }

  all = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let authorId = req.query.authorId as string;
      let authorOwn = req.query.authorOwn as string;
      if (authorOwn === "true") {
        authorId = req.user!._id;
      }
      
      let posts = [];

      if (authorId) posts = await this.postService.findByUser(authorId);
      else posts = await this.postService.getAll();
      
      const response = SuccessResponse("Postlar başarıyla getirildi", posts);
      res.status(response.code).json(response);

    } catch (e) {
      next(e)
    }
  }

  single = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.findById(req.params.id);
      const response = SuccessResponse("Post başarıyla getirildi", post);
      res.status(response.code).json(response)
    } catch(e) {
      next(e)
    }
  }

  like = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.postService.like(req.params.id, req.user!._id);
      const response = SuccessResponse("başarıyla beğenildi", null);
      res.status(response.code).json(response)
    } catch (e) {
      next(e);
    }
  }

  dislike = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.postService.dislike(req.params.id, req.user!._id);
      const response = SuccessResponse("başarıyla beğeni silindi", null);
      res.status(response.code).json(response)
    } catch (e) {
      next(e);
    }
  }

}