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
    try {
      const {
        title,
        short_description,
        prep_duration,
        cook_duration,
        servings,
        rating,
        category,
        kcal,
        difficulty,
        steps,
        tags,
        ingredients,
      } = req.body;

      const imageUrl = (req.file as Express.Multer.File)?.path || null;

      const recipeResult = await pool.query(
        `INSERT INTO recipes 
        (title, short_description, prep_duration, cook_duration, servings, rating, category, kcal, difficulty, image, steps, tags) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) 
        RETURNING id`,
        [
          title,
          short_description,
          prep_duration,
          cook_duration,
          servings,
          rating,
          category,
          kcal,
          difficulty,
          imageUrl,
          steps ? JSON.parse(steps) : [],
          tags ? JSON.parse(tags) : [],
        ]
      );

      const recipeId = recipeResult.rows[0].id;

      if (ingredients) {
        const parsedIngredients = JSON.parse(ingredients);
        for (const ing of parsedIngredients) {
          await pool.query(
            `INSERT INTO recipe_ingredients (recipe_id, amount, unit, name) VALUES ($1,$2,$3,$4)`,
            [recipeId, ing.amount, ing.unit, ing.name]
          );
        }
      }

      res.status(201).json({ success: true, recipeId });
    } catch (error) {
      next(error);
    }
  }
);



export const getAllRecipes = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { category, difficulty, max_kcal, max_cook_duration, title } =
      req.query;

    const conditions: string[] = [];
    const values: any[] = [];

    if (category) {
      values.push(category);
      conditions.push(`r.category ILIKE $${values.length}`);
    }

    if (difficulty) {
      values.push(difficulty);
      conditions.push(`r.difficulty = $${values.length}`);
    }

    if (max_kcal) {
      values.push(Number(max_kcal));
      conditions.push(`r.kcal <= $${values.length}`);
    }

    if (max_cook_duration) {
      values.push(Number(max_cook_duration));
      conditions.push(`r.cook_duration::int <= $${values.length}`);
    }

    if (title) {
      values.push(`%${title}%`);
      conditions.push(`r.title ILIKE $${values.length}`);
    }

    // base query with join + aggregation
    let query = `
      SELECT 
        r.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', ri.id,
              'amount', ri.amount,
              'unit', ri.unit,
              'name', ri.name
            )
          ) FILTER (WHERE ri.id IS NOT NULL), '[]'
        ) AS ingredients
      FROM recipes r
      LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    `;

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    query += ` GROUP BY r.id ORDER BY r.id DESC`;

    const recipes = await pool.query(query, values);
    res.json(recipes.rows);
  }
);

export const getRecipeInformation = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const recipe = await pool.query("SELECT * FROM recipes WHERE id = $1", [
      id,
    ]);

    if (recipe.rows.length === 0) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    res.json(recipe.rows[0]);
  }
);

export const recipesWithoutFilter = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    let query = `SELECT * FROM recipes`;

    const recipes = await pool.query(query);
    res.json(recipes.rows);
  }
);
