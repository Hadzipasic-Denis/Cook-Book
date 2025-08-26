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
    const { ingredients } = req.body; // e.g. ["tomato", "onion"]

    if (!ingredients || !Array.isArray(ingredients)) {
      res.status(400).json({ message: "Ingredients must be an array of names" });
      return;
    }

    const values = [ingredients]; // pass as text[]

    const query = `
      SELECT *
      FROM recipes
      WHERE
        -- ensure ALL recipe ingredients are within the user-provided list
        (SELECT array_agg(elem->>'name')
         FROM jsonb_array_elements(ingredients::jsonb) elem)::text[]
        <@ $1::text[]
        -- and at least one ingredient overlaps
        AND EXISTS (
          SELECT 1
          FROM jsonb_array_elements(ingredients::jsonb) elem
          WHERE elem->>'name' = ANY ($1::text[])
        )
    `;

    const result = await pool.query(query, values);
    res.json(result.rows);
  }
);

