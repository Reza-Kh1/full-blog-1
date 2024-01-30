import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";
import postsModel from "./postsModel.js";
const reviewsModel = dataBase.define(
  "reviews",
  {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: postsModel,
        key: "id",
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull:true
    },
  },
  {
    timestamps: true,
    tableName: "reviews",
    indexes: [
      { unique: false, fields: ["postId"] },
      { unique: false, fields: ["status"] },
    ],
  }
);
export default reviewsModel;
