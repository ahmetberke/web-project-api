import { AuthController } from '../controllers/auth.controller';
import { PostController } from '../controllers/post.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { ApiRouter } from './router';

export class PostRouter extends ApiRouter{
  
  private postController : PostController;

  constructor() {

    super("/posts");

    this.postController = new PostController();
    this.routes();

  }

  private routes() {
    this.router.post("/", AuthMiddleware.Authorization ,this.postController.create);
    this.router.get("/", AuthMiddleware.Authorization ,this.postController.all);
    this.router.get("/:id", AuthMiddleware.Authorization ,this.postController.single);
    this.router.get("/like/:id", AuthMiddleware.Authorization ,this.postController.like);
    this.router.get("/dislike/:id", AuthMiddleware.Authorization ,this.postController.dislike);
  }

}
