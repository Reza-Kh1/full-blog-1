import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";
const postsModel = dataBase.define(
  "posts",
  {
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgSrc: {
      type: DataTypes.STRING,
    },
    imgAlt: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      unique: {
        args: true,
        msg: "قبلا مقاله ای با این اسلاگ ثبت شده است",
      },
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    keywords: {
      type: DataTypes.STRING,
    },
  },
  {
    indexes: [
      {
        unique: false,
        fields: ["status", "description", "subject", "content"],
      },
      { unique: true, fields: ["slug"] },
    ],
    timestamps: true,
    tableName: "posts",
  }
);
export default postsModel;
