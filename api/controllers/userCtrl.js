import { customError } from "../middlewares/errorHandler.js";
import { usersModel } from "../models/index.js";
import asynHandler from "express-async-handler";
import { compareHash } from "../utils/createHash.js";
import createToken from "../utils/createToken.js";
import pagination from "../middlewares/pagination.js";
export const createUserAdmin = asynHandler(async (req, res) => {
  const { name, phone, password, email, role } = req.body;
  try {
    const data = await usersModel.create({
      name,
      phone,
      password,
      email,
      role,
    });
    res.send({ data });
  } catch (err) {
    throw customError("خطایی ایجاد شده لطفا دوباره تلاش کنید", 400);
  }
});
export const getSingleUser = asynHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await usersModel.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });
    res.send({ data });
  } catch (err) {
    throw customError("خطایی به وجود آمد لطفا دوباره تلاش کنید !", 401);
  }
});
export const createUser = asynHandler(async (req, res) => {
  let { name, phone, password, email } = req.body;
  let role;
  if ((!name, !phone, !password, !email)) {
    throw customError("تمام فیلد های لازم رو لطفا پر کنید !", 401);
  }
  try {
    const firstUser = await usersModel.count();
    if (firstUser === 0) {
      role = "ADMIN";
    }
    const data = await usersModel.create({
      name,
      phone,
      password,
      email,
      role,
    });
    const infoUser = {
      id: data.id,
      role: data.role,
      name: data.name,
      phone: data.phone,
      email: data.email,
    };
    const token = await createToken(infoUser);
    infoUser.token = token;
    res.send({ infoUser });
  } catch (err) {
    throw new Error(err);
  }
});
export const loginUser = asynHandler(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    throw customError("لطفا فیلدهای پسورد و شماره تلفن خود را پر کنید.", 400);
  }
  const data = await usersModel.findOne({
    where: {
      phone,
    },
  });
  if (!data) {
    throw customError("کاربری با این شماره تلفن ثبت نام نکرده است !", 401);
  }
  const compare = await compareHash(password, data.password);
  if (!compare) {
    throw customError("رمز وارد شده اشتباه است !", 400);
  }
  const infoUser = {
    id: data.id,
    role: data.role,
    name: data.name,
    phone: data.phone,
    email: data.email,
  };
  const token = await createToken(infoUser);
  infoUser.token = token;
  res.send({ infoUser });
});
export const getAllUser = asynHandler(async (req, res) => {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const limit = 10;
  const data = await usersModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["password"] },
    limit: limit,
    offset: page * limit - limit,
  });
  const pager = pagination(data.count, limit, page);
  data.pagination = pager;
  res.send({ data });
});
export const deleteUser = asynHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersModel.destroy({ where: { id } });
    if (!user) {
      throw new Error();
    }
    res.send({ message: "کاربر مورد نظر با موفقیت حذف شد." });
  } catch (err) {
    throw new Error("عملیات با خطا روبرو شد لطفا دوباره تلاش کنید !");
  }
});
export const updateUser = asynHandler(async (req, res) => {
  const { id } = req.params;
  const { name, password, role } = req.body;
  const data = await usersModel.findByPk(id);
  if (!data) {
    throw customError(
      "در برقراری ارتباط خطا ایجاد شده لطفا دوباره تلاش کنید !",
      401
    );
  }
  if (
    res.userInfo.role === "USER" &&
    res.userInfo.phone !== data.phone &&
    res.userInfo.email !== data.email
  ) {
    throw customError("شما مجاز به تغییر پروفایل نیستید !", 403);
  }
  if (password) {
    data.password = password;
  }
  if (name) {
    data.name = name;
  }
  if (res.userInfo.role === "ADMIN" && role) {
    data.role = role;
  }
  data.save();
  res.send({ message: "اطلاعات با موفقیت به روز شد" });
});
