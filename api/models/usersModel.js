import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";
import { createHash } from "../utils/createHash.js";
const usersModel = dataBase.define(
  "users",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "لطفا یک ایمیل معتبر وارد کنید",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "این شماره تلفن قبلا در سیستم ثبت شده است",
      },
      validate: {
        is: {
          args: /^(?:[0-9] ?){9,10}[0-9]$/,
          msg: "لطفا شماره تلفن خود را صحیح وارد کنید",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set: async function (value) {
        return this.setDataValue("password", await createHash(value));
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["ADMIN", "USER", "AUTHOR"],
      defaultValue: "USER",
    },
  },
  {
    timestamps: true,
    tableName: "users",
    indexes: [
      { unique: true, fields: ["phone"] },
    ],
  }
);
export default usersModel;
