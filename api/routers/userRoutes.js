import express from "express";
import {
  createUser,
  createUserAdmin,
  deleteUser,
  getAllUser,
  getSingleUser,
  loginUser,
  updateUser,
} from "../controllers/userCtrl.js";
import isLogin from "../utils/isLogin.js";
import isAdmin from "../utils/isAdmin.js";
const routes = express.Router();
routes.post("/login", loginUser);
routes.post("/admin", createUserAdmin);
routes.route("/").get(getAllUser).post(createUser);
routes
  .route("/:id")
  .get(getSingleUser)
  .delete(isAdmin, deleteUser)
  .put(isLogin, updateUser);
export default routes;
