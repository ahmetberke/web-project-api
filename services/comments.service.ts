import { Comment, Post, PrismaClient, User } from "@prisma/client";
import { Service } from "./service";
import { hashPassword } from "../utils/secret"
import { UserValidator } from "../validations/user.validator";
import { USER_NOT_FOUND_ERROR } from "../errors/user.error";
import { PostValidator } from "../validations/post.validator";
import { POST_NOT_FOUND_ERROR } from "../errors/post.error";
import { CommentValidator } from "../validations/comment.validator";

export class CommentService extends Service {

    constructor(repository: PrismaClient) {
        super(repository);
    }

    public async create(comment : Comment): Promise<Comment> {

      const validator = new CommentValidator(comment);
      validator.validate();

      return await this.repository.comment.create({
          data : comment
      });

    }

}