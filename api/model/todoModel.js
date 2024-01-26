import { DataTypes } from "sequelize";
import { dataBase } from "../db.js";
const todoModel = dataBase.define(
  "todo",
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
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "todo",
  }
);
export default todoModel;
