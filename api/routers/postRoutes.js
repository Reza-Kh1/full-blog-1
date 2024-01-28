import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getSinglePost,
  getSinglePostAdmin,
  searchPost,
  updatePost,getAllPostAdmin
} from "../controllers/postCtrl.js";
import isAdmin from "../utils/isAdmin.js";
const routes = express.Router();
routes.route("/").get(getAllPost).post(isAdmin, createPost);
routes.route("/admin/:slug").get(isAdmin,getSinglePostAdmin)
routes.route("/admin-all").get(isAdmin,getAllPostAdmin)
routes.route("/search/:text").get(searchPost)
routes
  .route("/:id")
  .get(getSinglePost)
  .put(isAdmin, updatePost)
  .delete(isAdmin, deletePost);
export default routes;
