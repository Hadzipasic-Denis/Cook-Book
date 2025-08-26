import express from "express";
import {
  approval,
  getAllPendingApprovals,
  suggestIngredient,
} from "../controllers/ingredients-controller";
import { authenticate } from "../middlewares/authenticate";

const ingredientRouter = express.Router();

ingredientRouter
  .route("/getAllPendingApprovals")
  .get(authenticate, getAllPendingApprovals);
ingredientRouter.route("/suggestIngredient").post(suggestIngredient);
ingredientRouter.route("/approval/:id").put(authenticate, approval);

export default ingredientRouter;
