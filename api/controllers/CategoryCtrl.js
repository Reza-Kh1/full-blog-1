import { categoryModel, subCategoryModel } from "../models/index.js";
import asyncHandler from "express-async-handler";
import { customError } from "../middlewares/errorHandler.js";
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const data = await categoryModel.create({ name });
  if (!data) throw new customError("دسته افزوده نشد", 401);
  res.send({ message: "دسته اضافه شد" });
});
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await categoryModel.destroy({ where: { id } });
    if (!data) throw new Error("عملیات حذف با خطا روبرو شد !");
    res.send({ message: "دسته موفقیت حذف شد" });
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      throw customError(
        "اول تمامیه زیر دسته های این دسته را حذف کنید سپس دوباره اقدام کنید",
        401
      );
    }
    throw customError(err, 401);
  }
});
export const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const data = await categoryModel.findAndCountAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: { model: subCategoryModel, attributes: ["name"] },
    });
    res.send({ data });
  } catch (err) {
    throw customError("اتصال با دیتا بیس برقرار نشد !", 401);
  }
});
export const getSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await categoryModel.findOne({
    where: { name: id },
    attributes: { exclude: ["createdAt", "updatedAt", "id"] },
    include: { model: subCategoryModel },
  });
  res.send({ data });
});
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const data = await categoryModel.findByPk(id);
    if (name) {
      data.name = name;
    }
    data.save();
    res.send({ meesage: "با موفقیت دسته به روز شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
