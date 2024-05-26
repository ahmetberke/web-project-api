import { HttpError } from "./error";

export const POST_NOT_FOUND_ERROR = new HttpError({
    code: 400,
    status: "fail",
    name: "PostNotFound",
    message: "Post Bulunamadı",
});

export const POSTS_REQUIRE_USER_ID_ERROR = new HttpError({
  code: 400,
  status: "error",
  name: "AuthorIdRequired",
  message: "Kullanıcı id gerekli"
})