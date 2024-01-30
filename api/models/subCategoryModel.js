import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";
const subCategoryModel = dataBase.define(
  "subCategory",
  { name: { type: DataTypes.STRING, allowNull: false } },
  { timestamps: true, tableName: "subCategory" }
);
export default subCategoryModel;