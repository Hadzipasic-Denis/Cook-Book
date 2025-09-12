import express from "express";
import {
  allIngredients,
  approval,
  filterRecipesByIngredients,
  getAllPendingApprovals,
  suggestIngredient,
} from "../controllers/ingredients-controller";
import { authenticate } from "../middlewares/authenticate";

const ingredientRouter = express.Router();

ingredientRouter.route("/getAllIngredients").get(allIngredients);
ingredientRouter
  .route("/getAllPendingApprovals")
  .get(authenticate, getAllPendingApprovals);
ingredientRouter.route("/filterRecipes").post(filterRecipesByIngredients);
ingredientRouter.route("/suggestIngredient").post(suggestIngredient);
ingredientRouter.route("/approval/:id").put(authenticate, approval);

export default ingredientRouter;
