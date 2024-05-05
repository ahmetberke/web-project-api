import { HttpError } from "./error";

export const USER_NOT_FOUND_ERROR = new HttpError({
    code: 400,
    status: "fail",
    name: "UserNotFound",
    message: "Kullanıcı Bulunamadı",
});
