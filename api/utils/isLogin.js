import token from "jsonwebtoken";
import { customError } from "../middlewares/errorHandler.js";
import asyncHandler from "express-async-handler";
const isLogin = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw customError("لطفا اول وارد حساب کاربری شوید", 400);
  try {
    const verify = authorization.split(" ")[1];
    const userInfo = token.verify(verify, process.env.TOKEN_SECURET);
    res.userInfo = userInfo;
    next();
  } catch (err) {
    throw customError("لطفا اول وارد حساب کاربری شوید", 400);
  }
});
export default isLogin;
