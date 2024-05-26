import { Api } from "./api/app";
import { AuthRouter } from "./api/routes/auth.router";
import { CommentRouter } from "./api/routes/comment.router";
import { PostRouter } from "./api/routes/post.router";

const PORT = process.env.PORT || 3000;

const api = new Api(
  new AuthRouter(),
  new PostRouter(),
  new CommentRouter()
);

api.app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})