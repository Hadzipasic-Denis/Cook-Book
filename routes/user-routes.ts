import express from "express";
import { login, register } from "../controllers/user-controller";
import { authnenticate } from "../middlewares/authenticate";

const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/register").post(authnenticate, register);

export default userRouter;
