import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/user-controller";
import { authnenticate } from "../middlewares/authenticate";

const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/getUserProfile").get(authnenticate, getProfile);
userRouter.route("/register").post(authnenticate, register);

export default userRouter;
