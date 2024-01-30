import {
  categoryModel,
  postsModel,
  subCategoryModel,
  usersModel,
} from "../models/index.js";
import asyncHandler from "express-async-handler";
import { customError } from "../middlewares/errorHandler.js";
import pagination from "../middlewares/pagination.js";
export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, id } = req.body;
  const data = await subCategoryModel.create({ name, categoryId: id });
  if (!data) throw new customError("عملیات با خطا روبرو شد !", 401);
  res.send({ message: "زیر دسته اضافه شد" });
});
export const deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await subCategoryModel.destroy({ where: { id } });
    if (!data) throw new Error("عملیات حذف با خطا روبرو شد !");
    res.send({ message: "زیر دسته موفقیت حذف شد" });
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError")
      throw customError(
        "تمامیه مقالاتی که با این زیر دسته بندی مرتب شده اند زیردسته بندی شان را تغییر دهید و یا  مقالات  را حذفشان کنید !",
        401
      );
    throw customError(err, 401);
  }
});
export const allSubCategory = asyncHandler(async (req, res) => {
  try {
    const data = await subCategoryModel.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "categoryId"] },
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getAllSubCategory = asyncHandler(async (req, res) => {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const limit = 10;
  try {
    const data = await subCategoryModel.findAndCountAll({
      attributes: { exclude: ["createdAt", "updatedAt", "categoryId"] },
      include: [{ model: categoryModel, attributes: ["name"] }],
      limit: limit,
      offset: page * limit - limit,
    });
    const pager = pagination(data.count, limit, page);
    data.pagination = pager;
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getSingleSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await subCategoryModel.findOne({
      where: { name: id },
      attributes: ["name", "id"],
      include: [{ model: categoryModel, attributes: ["name"] }],
    });
    const post = await postsModel.findAndCountAll({
      where: { status: true, subCategoryId: data.id },
      attributes: ["subject", "imgSrc", "slug", "description"],
      include: [{ model: usersModel, attributes: ["name"] }],
    });
    res.send({ data, post });
  } catch (err) {
    throw customError("عملیات با خطا روبرو شد لطفا دوباره تلاش کنید !", 401);
  }
});
export const updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;
  try {
    const data = await subCategoryModel.findByPk(id);
    const body = {};
    if (name) {
      body.name = name;
    }
    if (category) {
      body.categoryId = category;
    }
    await data.update(body);
    res.send({ meesage: "با موفقیت زیر دسته به روز شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const adminSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await subCategoryModel.findOne({
      where: { name: id },
      attributes: ["name", "id"],
      include: [{ model: categoryModel, attributes: ["name"] }],
    });
    const post = await postsModel.findAndCountAll({
      where: { subCategoryId: data.id },
      attributes: ["subject", "imgSrc", "slug", "description"],
      include: [{ model: usersModel, attributes: ["name"] }],
    });
    res.send({ data, post });
  } catch (err) {
    throw customError("عملیات با خطا روبرو شد لطفا دوباره تلاش کنید !", 401);
  }
});
