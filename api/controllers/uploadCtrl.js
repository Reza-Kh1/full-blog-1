import asyncHandler from "express-async-handler";
import { customError } from "../middlewares/errorHandler.js";
import imageModel from "../models/imagesModel.js";
import pagination from "../middlewares/pagination.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv"
dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadImage = asyncHandler(async (req, res) => {
  if (req.file == undefined) throw customError("هیچ عکسی انتخاب نشده است", 401);
  try {
    const data = await imageModel.create({
      url: req.file.path.replace(/\\/g, "/"),
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, 400);
  }
});
export const uploadImages = asyncHandler(async (req, res) => {
  if (req.files == undefined)
    throw customError("هیچ عکسی انتخاب نشده است", 401);
  try {
    const url = await req.files.map((i) => {
      return { url: i.path.replace(/\\/g, "/") };
    });
    const data = await imageModel.bulkCreate(url);
    res.send({ data });
  } catch (err) {
    throw customError(err, 400);
  }
});
export const getAllImage = asyncHandler(async (req, res) => {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const limit = 10;
  try {
    const data = await imageModel.findAndCountAll({
      order: [["id", "DESC"]],
      limit: limit,
      offset: limit * page - limit,
    });
    const pager = pagination(data.count, limit, page);
    data.pagination = pager;
    res.send({ data });
  } catch (err) {
    throw customError(err, 400);
  }
});
export const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const img = await imageModel.findByPk(id);
  if (!img) throw customError("عکس مورد نظر یافت نشد !", 404);
  const nameImg = img.url.replace(process.env.URL_SAVE_IMAGE, "");
  const directory = path.join(__dirname, `${process.env.URL_IMAGE_WWW}${nameImg}`);
  try {
    fs.unlink(directory, async (err) => {
      if (err) {
        res
          .status(403)
          .send({ message: "خطا در هنگام حذف عکس در بخش  فایل رخ داده است" });
        return;
      }
    });
    await img.destroy();
    res.send({ message: "عکس با موفقیت حذف شد" });
  } catch (err) {
    throw customError(err, 400);
  }
});
export const getAllFileImage = asyncHandler(async (req, res) => {
  const directory = path.join(__dirname, process.env.URL_IMAGE_WWW);
  fs.readdir(directory, (err, url) => {
    if (err) {
      throw customError("خطایی رخ داده لطفا دوباره تلاش کنید", 400);
    }
    const lenght = url.length;
    const data = {
      url,
      count: lenght,
    };
    res.send({ data });
    return;
  });
});
