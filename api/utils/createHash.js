import bcrypt from "bcryptjs";
import { customError } from "../middlewares/errorHandler.js";
export const createHash = async (value) => {
  return bcrypt.hashSync(value, 10);
};
export const compareHash = async (pass, hash) => {
  try {
    const password = await bcrypt.compare(pass, hash);
    if (!password) {
      throw new Error();
    }
    return password;
  } catch (err) {
    throw customError("رمز وارد شده اشتباه است لطفا دوباره تلاش کنید.", 401);
  }
};
