import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDb } from "../config/db.js";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import { globalHandler, notFound } from "../middlewares/errorHandler.js";
import userRoutes from "../routers/userRoutes.js";
import postRoutes from "../routers/postRoutes.js";
import uploadRoutes from "../routers/uplaodRoutes.js";
import categoryRoutes from "../routers/categoryRoute.js";
import subCategoryRoutes from "../routers/subCategoryRoute.js";
import reviewsRoutes from "../routers/reviewsRoute.js";
// Static
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// middlewares
dotenv.config();
app.use(cors());
app.use(helmet.xssFilter());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../public")));
connectDb();
// routes
app.use(`/${process.env.API_NODE}/user`, userRoutes);
app.use(`/${process.env.API_NODE}/post`, postRoutes);
app.use(`/${process.env.API_NODE}/upload`, uploadRoutes);
app.use(`/${process.env.API_NODE}/category`, categoryRoutes);
app.use(`/${process.env.API_NODE}/sub-category`, subCategoryRoutes);
app.use(`/${process.env.API_NODE}/reviews`, reviewsRoutes);
app.use(globalHandler);
app.use(notFound);
export default app;
