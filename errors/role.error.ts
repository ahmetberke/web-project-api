import { HttpError } from "./error";

export const ROLE_NO_AUTHORITY = new HttpError({
  code: 400,
  status: "error",
  name: "RoleNoAuthority",
  message: "Bu işlemi gerçekleştirmek için yetersiz role sahipsiniz.",
});