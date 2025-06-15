import { Router, Request, Response, json } from "express";
import UserRouter from "./user.route";

const apiRoute = Router();
apiRoute.use(json());

apiRoute.use("/users", UserRouter);

apiRoute.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    message: "Welcome :)",
    success: "ok",
  });
});

export default apiRoute;
