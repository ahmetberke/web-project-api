import { HttpError } from "./error";

export class ValidationError extends HttpError {

    constructor(message: string, fields: {name: string, message: string}[]) {
        super({
            code: 400,
            status: "fail",
            name: "Validation",
            message: message,
            details: fields
        })
    }
    
} 