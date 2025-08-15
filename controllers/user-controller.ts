import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/asyncWrapper";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db";
import { CustomError } from "../types/CustomError";

export const register = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, role, password } = req.body;

    const findUser = await pool.query(`SELECT id FROM users WHERE email = $1`, [
      email,
    ]);

    if (findUser.rowCount && findUser.rowCount > 0) {
      const error: CustomError = new Error(
        "User already exists!"
      ) as CustomError;
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await pool.query(
      `INSERT INTO users(email, password, role) VALUES($1, $2, $3) returning email, role`,
      [email, hashedPassword, role]
    );

    res.status(201).json(user.rows[0]);
  }
);

export const login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const findUser = await pool.query(
      `SELECT id, password, email, role FROM users WHERE email = $1`,
      [email]
    );

    if (findUser.rowCount === 0) {
      const error: CustomError = new Error("User not found!") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    const user = findUser.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      const error: CustomError = new Error(
        "Incorrect password!"
      ) as CustomError;
      error.statusCode = 401;
      throw error;
    }

    const payload = { email: user.email, role: user.role, id: user.id };

    console.log(payload);

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "480m",
    });

    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 28800000 })
      .json(payload);
  }
);

export const logout = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res
      .cookie("access_token", "", { httpOnly: true, maxAge: 0 })
      .json({ message: "Logged out!" });
  }
);

export const getProfile = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      const error: CustomError = new Error("Unauthorized!") as CustomError;
      error.statusCode = 401;
      return next(error);
    }

    const { id } = req.user;

    const profile = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    res.status(200).json({ profile: profile.rows[0] });
  }
);
