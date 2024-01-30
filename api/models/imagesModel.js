import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";
const imageModel = dataBase.define(
  "images",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "images",
    timestamps: false,
    indexes: [{ unique: false, fields: ["url"] }],
  }
);
export default imageModel;