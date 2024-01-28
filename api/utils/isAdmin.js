import token from "jsonwebtoken";
import { customError } from "../middlewares/errorHandler.js";
import asynchandler from "express-async-handler";
const isAdmin = asynchandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw customError("لطفا اول وارد حساب کاربری شوید", 400);
  }
  try {
    const verify = authorization.split(" ")[1];
    const userInfo = token.verify(verify, process.env.TOKEN_SECURET);
    if (userInfo.role !== "ADMIN") {
      throw new Error();
    }
    res.userInfo = userInfo;
    next();
  } catch (err) {
    throw customError("شما مجاز به این عملیات نیستید", 403);
  }
});
export default isAdmin;