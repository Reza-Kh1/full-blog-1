import { dataBase } from "../db.js";
import todoModel from "./todoModel.js";
dataBase.sync({ force:  true });
export { todoModel };
