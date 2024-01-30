import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDb } from "./config/postgresql.js";
import postRoutes from "./routers/postRoute.js"
const app = express();
connectDb()
app.use(express.json());
app.use(cors());
app.use(helmet.xssFilter());
app.use("/node-v1",postRoutes)
export default app;
