import { dataBase } from "../config/db.js";
import usersModel from "./usersModel.js";
import postsModel from "./postsModel.js";
import imageModel from "./imagesModel.js";
import subCategoryModel from "./subCategoryModel.js";
import categoryModel from "./categoryModel.js";
import reviewsModel from "./reviewsModel.js";
usersModel.hasOne(postsModel, {
  foreignKey: "userId",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});
postsModel.belongsTo(usersModel, {
  foreignKey: "userId",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});
// دسته ها
categoryModel.hasMany(subCategoryModel, {
  foreignKey: "categoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
subCategoryModel.belongsTo(categoryModel, {
  foreignKey: "categoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
subCategoryModel.hasOne(postsModel, {
  foreignKey: "subCategoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
postsModel.belongsTo(subCategoryModel, {
  foreignKey: "subCategoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
// دسته ها
postsModel.hasOne(reviewsModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "postId",
});
reviewsModel.belongsTo(postsModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "postId",
});
usersModel.hasOne(reviewsModel, {
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
  foreignKey: "userId",
});
reviewsModel.belongsTo(usersModel, {
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
  foreignKey: "userId",
});
reviewsModel.hasMany(reviewsModel, { as: "reply",foreignKey:"replyId" });
// dataBase.sync({ force: true });
dataBase.sync();
export { usersModel, postsModel, imageModel, subCategoryModel, categoryModel };
