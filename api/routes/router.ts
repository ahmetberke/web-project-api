import { Router } from "express";

export abstract class ApiRouter{
  
  protected baseRoute : string;
  protected router : Router;

  constructor(baseRoute: string) {
    this.baseRoute = baseRoute;
    this.router = Router();
  }

  public getRouter() {
    return this.router
  }

  public getBaseRoute() {
    return this.baseRoute;
  }

}