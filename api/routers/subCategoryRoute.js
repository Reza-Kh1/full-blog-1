import express from "express";
import {
  adminSubCategory,
  allSubCategory,
  createSubCategory,
  deleteSubCategory,
  getAllSubCategory,
  getSingleSubCategory,
  updateSubCategory,
} from "../controllers/subCategoryCtrl.js";
const routes = express.Router();
routes.route("/").get(getAllSubCategory).post(createSubCategory);
routes.route("/:id/admin").get(adminSubCategory);
routes.route("/all").get(allSubCategory);
routes
  .route("/:id")
  .get(getSingleSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);
export default routes;
