import { Api } from "./api/app";
import { AuthRouter } from "./api/routes/auth.router";

const PORT = process.env.PORT || 3000;

const api = new Api(
  new AuthRouter()
);

api.app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})