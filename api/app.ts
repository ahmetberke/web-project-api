import express, { Express } from 'express';
import { ApiRouter } from './routes/router';
import bodyParser from 'body-parser';
import { ErrorMiddleware } from './middlewares/error.middleware';
import cors from "cors"

export class Api {

  app : Express

  constructor(...routers : ApiRouter[]) {
    this.app = express();
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.initRouters(routers);
    this.app.use(ErrorMiddleware.handle);
  }

  public initRouters(routers : ApiRouter[]) {
    for (let r of routers) {
      this.app.use(r.getBaseRoute(), r.getRouter());
    }
  }
  
}