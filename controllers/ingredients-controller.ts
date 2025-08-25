import { NextFunction, Request, Response } from "express";
import pool from "../db";
import { asyncWrapper } from "../utils/asyncWrapper";

export const suggestIngredient = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;

    const ingredientResult = await pool.query(
      `INSERT INTO ingredients 
   (name, approval_status)
   VALUES ($1, $2)
   RETURNING *`,
      [name, "no"]
    );
    res.status(201).json(ingredientResult.rows[0]);
  }
);

export const getAllUnapprovedIngredients = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const ingredients = await pool.query(
      `SELECT * FROM ingredients WHERE approval_status = $1`,
      ["no"]
    );
    res.json(ingredients.rows);
  }
);
