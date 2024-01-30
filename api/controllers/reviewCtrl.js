import { customError } from "../middlewares/errorHandler.js";
import pagination from "../middlewares/pagination.js";
import postsModel from "../models/postsModel.js";
import reviewsModel from "../models/reviewsModel.js";
import asyncHandler from "express-async-handler";
import usersModel from "../models/usersModel.js";
export const getAllReviews = asyncHandler(async (req, res) => {
  let { page, status } = req.query;
  const filter = {};
  if (status) {
    filter.status = status;
  }
  if (!page) {
    page = 1;
  }
  const limit = 10;
  const data = await reviewsModel.findAndCountAll({
    where: filter,
    order: [["createdAt", "DESC"]],
    limit: limit,
    offset: limit * page - limit,
    include: { model: usersModel, attributes: ["phone", "name"] },
  });
  if (data.count === 0) throw customError("هیچ کامنتی جدیدی وجود ندارد !", 404);
  const pager = pagination(data.count, limit, page);
  data.pagination = pager;
  res.send({ data });
});
export const createReview = asyncHandler(async (req, res) => {
  const { comment, reply } = req.body;
  let { id } = req.params;
  const info = res.userInfo.role;
  try {
    const data = await reviewsModel.create({
      status: info === "ADMIN" ? true : false,
      comment,
      replyId: reply,
      postId: id,
      userId: res.userInfo.id,
    });
    if (!data) throw new Error("عملیات با خطا روبرو شد");
    res.send({
      message:
        "نظر شما با موفقیت ثبت شد پس از تایید توسط ادمین نمایش دیده میشود",
      data,
    });
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      throw customError("لطفا دوباره وارد حساب کاربری شوید", 401);
    }
    throw customError(err, 401);
  }
});
export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await reviewsModel.destroy({ where: { id } });
    if (!data) throw new Error("عملیات حذف با خطا روبرو شد !");
    res.send({ message: "نظر با موفقیت حذف شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const updateReview = asyncHandler(async (req, res) => {
  const { comment, status } = req.body;
  if (!comment && !status)
    throw customError("لطفا فیلد های لازم رو پر کنید", 401);
  const { id } = req.params;
  const body = {};
  try {
    const data = await reviewsModel.findByPk(id);
    if (comment) {
      body.comment = comment;
    }
    if (status) {
      body.status = status;
    }
    data.update(body);
    data.save();
    res.send({ message: "نظر با موفقیت آپدیت شد" });
  } catch (err) {
    throw customError("عملیات با خطا مواجه شد", 401);
  }
});
export const getSingleReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await reviewsModel.findByPk(id, {
    include: [
      { model: postsModel, attributes: ["subject"] },
      {
        model: reviewsModel,
        as: "reply",
        attributes: ["comment"],
        include: [{ model: usersModel, attributes: ["name"] }],
      },
      { model: usersModel, attributes: ["name"] },
    ],
  });
  if (!data) throw new Error("عملیات با خطا روبرو شد");
  res.send({ data });
});
export const getReviewsPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const body = {};
  const limit = 10;
  const count = await reviewsModel.count({
    where: { status: true, postId: id },
  });
  if (count === 0) {
    res.send({ message: "هیچ کامنتی هنوز ثبت نشده !" });
    return;
  }
  const data = await reviewsModel.findAll({
    where: { postId: id, status: true },
    order: [["createdAt", "DESC"]],
    limit: limit,
    offset: page * limit - limit,
    attributes: ["comment", "createdAt", "id"],
    include: [
      {
        where: { status: true },
        separate: true,
        model: reviewsModel,
        attributes: ["comment", "createdAt", "id"],
        include: [{ model: usersModel, attributes: ["name"] }],
        as: "reply",
      },
      { model: usersModel, attributes: ["name"] },
    ],
  });

  const pager = pagination(count, limit, page);
  body.pagination = pager;
  body.count = count;
  res.send({ data, body });
});
export const getReviewReply = asyncHandler(async (req, res) => {
  const { review } = req.params;
  const data = await reviewsModel.findByPk(review, {
    include: [
      {
        where: { status: true },
        model: reviewsModel,
        as: "reply",
        attributes: ["id", "comment", "createdAt"],
        include: [{ model: usersModel, attributes: ["name"] }],
      },
      { model: usersModel, attributes: ["name"] },
    ],
    attributes: ["id", "comment", "createdAt"],
  });
  if (!data) throw customError("هیچ نظری ثبت نشده ", 404);
  res.send({ data });
});
