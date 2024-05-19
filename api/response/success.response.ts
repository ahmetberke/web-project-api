import { Response } from "./response"

export const SuccessResponse = (message: string, data: any) : Response => {
  return {
    message,
    data,
    status: "success",
    code: 200
  }
}

export const SuccessCreateResponse = (message: string, data: any) : Response => {
  return {
    message,
    data,
    status: "success",
    code: 201
  }
}