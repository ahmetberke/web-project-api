import { Post, PrismaClient, User } from "@prisma/client";
import { Service } from "./service";
import { hashPassword } from "../utils/secret"
import { UserValidator } from "../validations/user.validator";
import { USER_NOT_FOUND_ERROR } from "../errors/user.error";
import { PostValidator } from "../validations/post.validator";
import { POST_NOT_FOUND_ERROR } from "../errors/post.error";

export class PostService extends Service {

    constructor(repository: PrismaClient) {
        super(repository);
    }

    public async create(post : Post): Promise<Post> {

      const validator = new PostValidator(post);
      validator.validate();

      return await this.repository.post.create({
          data : post
      });

    }

    public async findById(id: string): Promise<Post> {
      const post = await this.repository.post.findFirst({
          where: {
              id
          },
          include: {
            comments: {
              include: {
                author: {
                  select: {
                    username: true,
                    id: true,
                    fullname: true
                  }
                }
              }
            },
            author: {
              select: {
                username: true,
                id: true,
                fullname: true
              }
            }
          }
      });
      if (!post) {
          throw POST_NOT_FOUND_ERROR
      }
      return post;
    }

    public async findByUser(userId: string) : Promise<Array<any>> {
      const posts = await this.repository.post.findMany({
        where: {
          authorId: userId
        }
      });
      return posts
    }

    public async getAll() : Promise<Array<any>> {
      const posts = await this.repository.post.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          author:  {
            select: {
              id: true,
              username: true,
              fullname: true
            }
          }
        },
        take: 10 
      });
      return posts
    }

    public async like(postId: string, userId: string) {
      await this.repository.post.update({
        where: {
          id: postId,
          NOT: {
            likes: {
              has: userId
            }
          }
        },
        data: {
          likes: {
            push: userId
          }
        }
      })
    }

    public async dislike(postId: string, userId: string) {

      const post = await this.repository.post.findFirst({
        where: {
          id: postId
        }
      });

      if (!post) throw POST_NOT_FOUND_ERROR

      await this.repository.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            set : post.likes.filter(e => e !== userId)
          }
        }
      })
    }
  

}