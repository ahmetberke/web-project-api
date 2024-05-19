import { HttpError } from "./error";

export class UniqueError extends HttpError {

    constructor(message: string, field: {name: string}) {
        super({
            code: 400,
            status: "fail",
            name: "Unique",
            message: message,
            details: field
        })
    }
    
} 