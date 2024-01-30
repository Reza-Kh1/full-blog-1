import { useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaPen } from "react-icons/fa";
import EditCategory from "../EditCategory/EditCategory";
import { fetchApi } from "../Fetch/FetchApi";
type categoryType = {
  id: number;
  name: string;
};
type AdminCategoryType = {
  category: categoryType[];
  setCategory: (value: categoryType[]) => void;
};
export default function Category({ category, setCategory }: AdminCategoryType) {
  const [id, setId] = useState<number>();
  const [show, setShow] = useState<boolean>(false);
  const deleteCategory = async (id: number) => {
    const data = await fetchApi({ url: `/category/${id}`, method: "DELETE" });
    if (data.error) return;
    toast.success("دسته حذف شد");
    const newCategory = category.filter((i: categoryType) => {
      return i.id !== id;
    });
    setCategory(newCategory);
  };
  const editCategory = async (form: { category: string }) => {
    const body = {
      name: form.category,
    };
    const data = await fetchApi({
      url: `/category/${id}`,
      method: "PUT",
      body,
    });
    if (data.error) return;
    toast.success("با موفقیت دسته ویرایش شد");
    category.forEach((i: categoryType) => {
      if (i.id === id) {
        i.name = form.category;
      }
    });
    setShow(false);
  };
  return (
    <>
      <div className="w-full bg-slate-600 p-3 rounded-lg mt-4">
        <span> دسته های اصلی</span>
        <div className="flex flex-wrap w-full mt-3 gap-2">
          {category &&
            category.map((i: categoryType) => (
              <div className="flex p-2 rounded-md bg-blue-200" key={i.id}>
                <span>{i.name}</span>
                <div className="mr-2 border-gray-950 pr-2 border-r">
                  <i onClick={() => deleteCategory(i.id)}>
                    <FaTrash className="inline ml-3 text-red-500 cursor-pointer" />
                  </i>
                  <i
                    onClick={() => {
                      setId(i.id), setShow(true);
                    }}
                  >
                    <FaPen className="inline text-blue-600 cursor-pointer" />
                  </i>
                </div>
              </div>
            ))}
        </div>
      </div>
      <EditCategory editCategory={editCategory} setShow={setShow} show={show} />
    </>
  );
}
