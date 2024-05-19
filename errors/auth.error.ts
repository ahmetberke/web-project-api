import { HttpError } from "./error";

export const AUTH_WRONG_PASSWORD_ERROR = new HttpError({
    code: 400,
    status: "error",
    name: "AuthWrongPassword",
    message: "Şifre hatalı",
});

export const AUTH_NO_AUTHORIZED = new HttpError({
  code: 400,
  status: "error",
  name: "AuthNoAuthorized",
  message: "Yetkilendirme hatası",
});