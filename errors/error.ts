type StatusType = "fail" | "error"

export interface HttpErrorPayload {
    code: number;
    name: string;
    status: StatusType;
    message: string;
    details?: any;
}

export class HttpError extends Error {
    
    readonly code: number;
    readonly name: string;
    readonly status: string;
    readonly details?: any;
    readonly message : string;
    
    constructor(payload : HttpErrorPayload) {
        super(payload.message);
        this.code = payload.code;
        this.name = payload.name;
        this.status = payload.status;
        this.message = payload.message
        this.details = payload.details;
    }

    public response() : any {
        return {
            code: this.code,
            name: this.name,
            status: this.status,
            details : this.details,
            message: this.message
        }
    }

}