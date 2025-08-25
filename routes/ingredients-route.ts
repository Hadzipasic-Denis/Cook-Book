import express from "express";
import {
  getAllUnapprovedIngredients,
  suggestIngredient,
} from "../controllers/ingredients-controller";
import { authnenticate } from "../middlewares/authenticate";

const ingredientRouter = express.Router();

ingredientRouter
  .route("/getAllUnapprovedIngredients")
  .get(authnenticate, getAllUnapprovedIngredients);
ingredientRouter.route("/suggestIngredient").post(suggestIngredient);

export default ingredientRouter;
