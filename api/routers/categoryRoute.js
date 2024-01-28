import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from "../controllers/CategoryCtrl.js";
const routes = express.Router();
routes.route("/").post(createCategory).get(getAllCategory);
routes
  .route("/:id")
  .put(updateCategory)
  .get(getSingleCategory)
  .delete(deleteCategory);
export default routes;