import { CommentController } from '../controllers/comment.controller';
import { PostController } from '../controllers/post.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ApiRouter } from './router';

export class CommentRouter extends ApiRouter{
  
  private commentController : CommentController;

  constructor() {

    super("/comments");

    this.commentController = new CommentController();
    this.routes();

  }

  private routes() {
    this.router.post("/", AuthMiddleware.Authorization ,this.commentController.create);
  }

}
