import token from "jsonwebtoken";
const createToken = async (value) => {
  const newToken = token.sign(value, process.env.TOKEN_SECURET, {
    expiresIn: "30d",
  });
  return newToken;
};
export default createToken;
