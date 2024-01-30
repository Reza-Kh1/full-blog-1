import { dataBase } from "../config/postgresql.js";
import postModel from "./postModel.js";

dataBase.sync();
// dataBase.sync({ force: true });
export { postModel };
