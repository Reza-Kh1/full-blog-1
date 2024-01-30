import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";
const categoryModel = dataBase.define(
  "category",
  {
    name: {
      unique: {
        args: true,
        msg: "نام این دسته تکراری است",
      },
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "category" }
);
export default categoryModel;
