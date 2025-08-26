import { NextFunction, Request, Response } from "express";
import pool from "../db";
import { asyncWrapper } from "../utils/asyncWrapper";
import { CustomError } from "../types/CustomError";

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
