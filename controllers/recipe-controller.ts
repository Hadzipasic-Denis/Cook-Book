import { NextFunction, Request, Response } from "express";
import pool from "../db";
import multer from "multer";
import { asyncWrapper } from "../utils/asyncWrapper";
import cloudinary from "../middlewares/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
});

export const upload = multer({ storage });

export const createRecipe = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      title,
      ingredients,
      prep_duration,
      cook_duration,
      steps,
      servings,
      tags,
      short_description,
      category,
      kcal,
      difficulty,
    } = req.body;

    const image = req.file?.path;

    const recipeResult = await pool.query(
      `INSERT INTO recipes 
   (title, ingredients, prep_duration, cook_duration, steps, image, servings, tags, short_description, category, kcal, difficulty)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
   RETURNING *`,
      [
        title,
        JSON.stringify(ingredients),
        prep_duration,
        cook_duration,
        JSON.stringify(steps),
        image,
        servings,
        JSON.stringify(tags),
        short_description,
        category,
        kcal,
        difficulty
      ]
    );
    res.status(201).json(recipeResult.rows[0]);
  }
);

export const getAllRecipes = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const recipes = await pool.query(`
  SELECT 
  * FROM recipes
    `);

    res.json(recipes.rows);
  }
);
