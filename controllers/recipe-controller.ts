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
        difficulty,
      ]
    );
    res.status(201).json(recipeResult.rows[0]);
  }
);

export const getAllRecipes = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { category, difficulty, max_kcal, max_cook_duration, title } =
      req.query;

    let query = `SELECT * FROM recipes`;
    const conditions: string[] = [];
    const values: any[] = [];

    if (category) {
      values.push(category);
      conditions.push(`category ILIKE $${values.length}`);
    }

    if (difficulty) {
      values.push(difficulty);
      conditions.push(`difficulty = $${values.length}`);
    }

    if (max_kcal) {
      values.push(Number(max_kcal));
      conditions.push(`kcal <= $${values.length}`);
    }

    if (max_cook_duration) {
      values.push(Number(max_cook_duration));
      conditions.push(`cook_duration <= $${values.length}`);
    }

    if (title) {
      values.push(`%${title}%`);
      conditions.push(`title ILIKE $${values.length}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const recipes = await pool.query(query, values);
    res.json(recipes.rows);
  }
);

export const recipesWithoutFilter = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    let query = `SELECT * FROM recipes`;

    const recipes = await pool.query(query);
    res.json(recipes.rows);
  }
);
