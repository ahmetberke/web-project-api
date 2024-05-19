import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../errors/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UniqueError } from "../../errors/unique.error";
import { INTERNAL_SERVER_ERROR } from "../../errors/server.error";

export class ErrorMiddleware {
  static handle = async (err: Error, req: Request, res: Response, next: NextFunction) => {

    switch(true) {
      case err instanceof HttpError:
        res.status(err.code).json(err.response());
        break
      case err instanceof PrismaClientKnownRequestError:
        const name = ((err as PrismaClientKnownRequestError).meta!.target as string).split("_")[1];
        const prismaValidationError = new UniqueError(`${name} zaten kullanılıyor`,{
          name
        });
        res.status(prismaValidationError.code).json(prismaValidationError.response());
        break;
      default:
        res.status(INTERNAL_SERVER_ERROR.code).json(INTERNAL_SERVER_ERROR.response());
        console.log(err);
    }

  }
}