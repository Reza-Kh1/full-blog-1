import { postModel } from "../models/index.js";
export const getPost = async (req, res) => {
  const data = await postModel.findAll();

  res.send({ data });
};
export const CreatePost = async (req, res) => {
  const { name, number } = req.body;
  const data = await postModel.create({ name, number });
  res.send({ data });
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const data = await postModel.destroy({ where: { id } });
  if (!data) return res.status(400).send({ message: "The id is not valid" });
  res.send({ message: "پست با موفقیت حذف شد" });
};
export const getSinglePost = async (req, res) => {
  const { id } = req.params;
  const data = await postModel.findOne({ where: { id } });
  if (!data) return res.status(400).send({ message: "The id is not valid" });

  data.number += 1;
  data.save();

  res.send({ data });
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { name, number } = req.body;
  try {
    const data = await postModel.findByPk(id);
    if (name) {
      data.name = name;
    }
    if (number) {
      data.number = number;
    }
    data.save();
    res.send({ data });
  } catch (err) {
    res.send({ messgae: "محصولی یافت نشد" });
  }
};
