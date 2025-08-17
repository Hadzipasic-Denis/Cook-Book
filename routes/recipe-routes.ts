import express from "express"
import { createRecipe, getAllRecipes, upload } from "../controllers/recipe-controller"

const recipeRouter = express.Router()

recipeRouter.route("/").get(getAllRecipes)
recipeRouter.route("/createNewRecipe").post(upload.single("image"), createRecipe)

export default recipeRouter