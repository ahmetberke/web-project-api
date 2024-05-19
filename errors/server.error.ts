import { HttpError } from "./error";

export const INTERNAL_SERVER_ERROR = new HttpError({
    code: 500,
    status: "error",
    name: "InternalServerError",
    message: "bir şeyler ters gitti",
});
