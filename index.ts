import "dotenv/config";
import "./db.ts";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import recipeRouter from "./routes/recipe-routes";
import { errorHandler } from "./middlewares/errorHandler";
import userRouter from "./routes/user-routes";
import ingredientRouter from "./routes/ingredients-route";
import path from "path"

const app = express();
const port = process.env.PORT || 3000;


app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "client", "dist")));

app.use("/ingredient", ingredientRouter);
app.use("/recipe", recipeRouter);
app.use("/user", userRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
