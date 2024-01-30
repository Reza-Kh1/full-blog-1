import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewReply,
  getReviewsPost,
  getSingleReview,
  updateReview,
} from "../controllers/reviewCtrl.js";
import isLogin from "../utils/isLogin.js";
import isAdmin from "../utils/isAdmin.js";
const routes = express.Router();
routes.route("/admin").get(getAllReviews);
routes.route("/admin/:id").get(getSingleReview);
routes
  .route("/:id")
  .post(isLogin, createReview)
  .put(updateReview)
  .delete(deleteReview)
  .get(getReviewsPost);
routes.route("/reply/:review").get(getReviewReply);
export default routes;
