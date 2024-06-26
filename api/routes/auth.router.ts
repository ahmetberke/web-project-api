import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { ApiRouter } from './router';

export class AuthRouter extends ApiRouter{
  
  private authController : AuthController;

  constructor() {

    super("/auth");

    this.authController = new AuthController();
    this.routes();

  }

  private routes() {
    this.router.post("/register", this.authController.register);
    this.router.post("/login", this.authController.login);
    this.router.get("/me", AuthMiddleware.Authorization, this.authController.me)
  }

}
