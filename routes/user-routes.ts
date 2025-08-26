import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/user-controller";
import { authenticate } from "../middlewares/authenticate";

const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/getUserProfile").get(authenticate, getProfile);
userRouter.route("/register").post(authenticate, register);

export default userRouter;
