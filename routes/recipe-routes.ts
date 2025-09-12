import express from "express"
import { createRecipe, getAllRecipes, getRecipeInformation, recipesWithoutFilter, upload } from "../controllers/recipe-controller"
import { authenticate } from "../middlewares/authenticate"

const recipeRouter = express.Router()

recipeRouter.route("/").get(getAllRecipes)
recipeRouter.route("/recipesWithouthFilter").get(recipesWithoutFilter)
recipeRouter.route("/createNewRecipe").post(authenticate, upload.single("image"), createRecipe)
recipeRouter.route("/recipeInformation/:id").get(getRecipeInformation)

export default recipeRouter