import express from "express";
import {
  CreatePost,
  deletePost,
  getPost,
  getSinglePost,
  updatePost,
} from "../controllers/postCtrl.js";
const routes = express.Router();
routes.route("/").get(getPost).post(CreatePost);
routes.route("/:id").delete(deletePost).put(updatePost).get(getSinglePost);
export default routes;
