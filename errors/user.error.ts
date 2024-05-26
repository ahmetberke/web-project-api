import { HttpError } from "./error";

export const USER_NOT_FOUND_ERROR = new HttpError({
    code: 400,
    status: "fail",
    name: "UserNotFound",
    message: "Kullanıcı Bulunamadı",
});

export const USER_ID_NOT_VALID = new HttpError({
    code: 400,
    status: "error",
    name: "UserIdNotValid",
    message: "Kullanıcı id'si geçersiz"
})