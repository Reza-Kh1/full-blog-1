import { Sequelize } from "sequelize";
export const dataBase = new Sequelize("next", "postgres", "admin", {
  port: 5432,
  host: "localhost",
  dialect: "postgres",
  dialectOptions: {
    requestTimeout: 30000,
    encrypt: true,
  },
  logging: false,
});
export const connectDb = () => {
  try {
    dataBase.authenticate();
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};
