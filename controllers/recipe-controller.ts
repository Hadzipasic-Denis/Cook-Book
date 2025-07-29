import { NextFunction, Request, Response } from "express";
import pool from "../db";
import multer from "multer";
import path from "path";
import fs from "fs";
import { asyncWrapper } from "../utils/asyncWrapper";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const createRecipe = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      title,
      ingredients,
      prepDuration,
      cookDuration,
      steps,
      servings,
      tags,
    } = req.body;

    const image = req.file?.filename;

    const recipeResult = await pool.query(
      `INSERT INTO recipes (title, ingredients, prep_duration, cook_duration, steps, image, servings, tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        title,
        JSON.stringify(ingredients),
        prepDuration,
        cookDuration,
        steps,
        image,
        servings,
        tags,
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
