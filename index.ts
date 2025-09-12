import "dotenv/config";
import "./db.ts";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import recipeRouter from "./routes/recipe-routes";
import { errorHandler } from "./middlewares/errorHandler";
import userRouter from "./routes/user-routes";
import ingredientRouter from "./routes/ingredients-route";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/ingredient", ingredientRouter);
app.use("/recipe", recipeRouter);
app.use("/user", userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
