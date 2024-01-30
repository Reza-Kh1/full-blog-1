import express from "express";
import {
  deleteImage,
  getAllFileImage,
  getAllImage,
  uploadImage,
  uploadImages,
} from "../controllers/uploadCtrl.js";
import { uploadSingle, uploadArray } from "../middlewares/upload.js";

const routes = express.Router();
routes.route("/").post(uploadSingle, uploadImage).get(getAllImage);
routes.route("/array").get(getAllFileImage).post(uploadArray, uploadImages);
routes.route("/:id").delete(deleteImage);
export default routes;
