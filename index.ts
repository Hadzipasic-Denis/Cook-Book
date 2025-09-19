import "dotenv/config";
import "./db.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import recipeRouter from "./routes/recipe-routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/user-routes.js";
import ingredientRouter from "./routes/ingredients-route.js";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "client", "dist")));

app.use("/api/ingredient", ingredientRouter);
app.use("/api/recipe", recipeRouter);
app.use("/api/user", userRouter);

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
