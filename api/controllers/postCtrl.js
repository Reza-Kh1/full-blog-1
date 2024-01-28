import { Op } from "sequelize";
import { customError } from "../middlewares/errorHandler.js";
import pagination from "../middlewares/pagination.js";
import { postsModel, subCategoryModel, usersModel } from "../models/index.js";
import asyncHandler from "express-async-handler";
export const createPost = asyncHandler(async (req, res) => {
  const {
    subject,
    imgSrc,
    imgAlt,
    content,
    title,
    slug,
    description,
    keywords,
    subCategoryId,
    status,
  } = req.body;
  if (!subject && !content && !title && !slug)
    throw customError("تمامیه فیلد هارو پر کنید لطفا", 401);
  try {
    const data = await postsModel.create({
      userId: res.userInfo.id,
      subject,
      imgSrc,
      imgAlt,
      content,
      title,
      slug,
      description,
      keywords,
      subCategoryId,
      status,
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, 400);
  }
});
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    status,
    subject,
    imgSrc,
    imgAlt,
    content,
    title,
    slug,
    description,
    subCategoryId,
    keywords,
  } = req.body;
  try {
    const data = await postsModel.findByPk(id);
    const body = {};
    if (!data)
      throw customError("مقاله مورد نظر یافت نشد ! دوباره تلاش کنید", 404);
    if (status || status === false) {
      body.status = status;
    }
    if (subject) {
      body.subject = subject;
    }
    if (imgSrc) {
      body.imgSrc = imgSrc;
    }
    if (imgAlt) {
      body.imgAlt = imgAlt;
    }
    if (content) {
      body.content = content;
    }
    if (title) {
      body.title = title;
    }
    if (slug) {
      body.slug = slug;
    }
    if (description) {
      body.description = description;
    }
    if (keywords) {
      body.keywords = keywords;
    }
    if (subCategoryId) {
      body.subCategoryId = subCategoryId;
    }
    await data.update(body);
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await postsModel.destroy({ where: { id } });
    if (!data) throw new Error();
    res.send({ message: "مقاله با موفقیت حذف شد" });
  } catch (err) {
    throw customError("عملیات با خطا روبرو شد !", 404);
  }
});
export const getSinglePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await postsModel.findOne({
      where: { slug: id, status: true },
      attributes: { exclude: ["id", "createdAt", "userId", "subCategoryId"] },
      include: [
        { model: usersModel, attributes: ["name"] },
        { model: subCategoryModel, attributes: ["name"] },
      ],
    });
    if (!data) throw new Error("مقاله مورد نظر یافت نشد");
    res.send({ data });
  } catch (err) {
    throw customError(err, 404);
  }
});
export const getAllPost = asyncHandler(async (req, res) => {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const limit = 5;
  try {
    const data = await postsModel.findAndCountAll({
      where: { status: true },
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: limit * page - limit,
      attributes: {
        exclude: [
          "id",
          "status",
          "content",
          "keywords",
          "createdAt",
          "userId",
          "subCategoryId",
        ],
      },
      include: [
        { model: usersModel, attributes: ["name"] },
        { model: subCategoryModel, attributes: ["name"] },
      ],
    });
    if (!data.count) throw new Error("هیچ مقاله ای برای نمایش وجود ندارد");
    const pager = pagination(data.count, limit, page);
    data.pagination = pager;
    res.send({ data });
  } catch (err) {
    throw customError(err, 400);
  }
});
export const getSinglePostAdmin = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const data = await postsModel.findOne({
      where: { slug },
    });
    if (!data) throw new Error("مقاله مورد نظر یافت نشد");
    res.send({ data });
  } catch (err) {
    throw customError(err, 404);
  }
});
export const getAllPostAdmin = asyncHandler(async (req, res) => {
  let { status, page } = req.query;
  if (!status) {
    status = false;
  }
  if (!page) {
    page = 1;
  }
  const limit = 5;
  try {
    const data = await postsModel.findAndCountAll({
      where: { status },
      attributes: { exclude: ["content", "userId"] },
      order: [["createdAt", "DESC"]],
      include: [{ model: usersModel, attributes: ["name"] }],
      limit: limit,
      offset: limit * page - limit,
    });
    if (!data.count) throw new Error("هیچ مقاله ای برای نمایش وجود ندارد");
    const pager = pagination(data.count, limit, page);
    data.pagination = pager;
    res.send({ data });
  } catch (err) {
    throw customError(err, 400);
  }
});
export const searchPost = asyncHandler(async (req, res) => {
  const { text } = req.params;
  let { id, page } = req.query;
  if (!page) {
    page = 1;
  }
  const limit = 10;
  let filter = {};
  if (id) {
    filter = {
      userId: id,
    };
  }
  if (text) {
    const txt = {
      [Op.or]: [
        {
          subject: {
            [Op.like]: `%${text}%`,
          },
        },
        {
          description: {
            [Op.like]: `%${text}%`,
          },
        },
        {
          content: {
            [Op.like]: `%${text}%`,
          },
        },
      ],
    };
    filter = {
      ...filter,
      ...txt,
      status: true,
    };
  }
  const data = await postsModel.findAndCountAll({
    where: filter,
    limit: limit,
    offset: page * limit - limit,
    order: [["createdAt", "DESC"]],
    attributes: [
      "subject",
      "imgSrc",
      "title",
      "slug",
      "description",
      "updatedAt",
    ],
    include: [
      { model: usersModel, attributes: ["name"] },
      { model: subCategoryModel, attributes: ["name"] },
    ],
  });
  if (!data) throw customError("هیچ مقاله ای یافت نشد", 404);
  const pager = pagination(data.count, limit, page);
  data.pagination = pager;
  res.send({ data });
});
