import { NextFunction, Request, Response } from "express";
import pool from "../db";
import { asyncWrapper } from "../utils/asyncWrapper";
import { CustomError } from "../types/CustomError";

export const allIngredients = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    let query = `SELECT * FROM ingredients`;

    const ingredients = await pool.query(query);
    res.json(ingredients.rows);
  }
);

export const suggestIngredient = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;

    const ingredientResult = await pool.query(
      `INSERT INTO ingredients 
   (name, approval_status)
   VALUES ($1, $2)
   RETURNING *`,
      [name, "pending"]
    );
    res.status(201).json(ingredientResult.rows[0]);
  }
);

export const getAllPendingApprovals = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const ingredients = await pool.query(
      `SELECT * FROM ingredients WHERE approval_status = $1`,
      ["pending"]
    );
    res.json(ingredients.rows);
  }
);

export const approval = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    const ingredient = await pool.query(
      `UPDATE ingredients
       SET approval_status = $1
       WHERE id = $2 AND approval_status = 'pending'
       RETURNING *`,
      [status, id]
    );

    if (ingredient.rowCount === 0) {
      const error: CustomError = new Error(
        "Ingredient not found or not pending!"
      ) as CustomError;
      error.statusCode = 404;
      throw error;
    }

    res.json(ingredient.rows[0]);
  }
);
export const filterRecipesByIngredients = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      res.status(400).json({ error: "Ingredients array is required" });
      return;
    }

    // Build parameterized placeholders
    const placeholders = ingredients.map((_, i) => `$${i + 1}`).join(", ");

    const query = `
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
      JOIN recipe_ingredients ri ON r.id = ri.recipe_id
      JOIN ingredients i ON i.name = ri.name
      WHERE i.approval_status = 'yes'
      AND i.name IN (${placeholders})
      GROUP BY r.id
      ORDER BY r.id DESC
    `;

    const result = await pool.query(query, ingredients);
    res.json(result.rows);
  }
);



