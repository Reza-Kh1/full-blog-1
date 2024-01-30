import { DataTypes } from "sequelize";
import { dataBase } from "../config/postgresql.js";
const postModel = dataBase.define(
  "post",
  {
    name: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false, tableName: "post" }
);
export default postModel