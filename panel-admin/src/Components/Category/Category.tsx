import { useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaPen } from "react-icons/fa";
import EditCategory from "../EditCategory/EditCategory";
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/category/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.user?.token}`,
        },
      }
    );
    if (!res.ok) {
      toast.error("دسته حذف نشد");
      return;
    }
    toast.success("دسته حذف شد");
    const newCategory = category.filter((i: categoryType) => {
      return i.id !== id;
    });
    setCategory(newCategory);
  };
  const editCategory = async (form: FormData) => {
    const newCategory = form.get("category") as string;
    const body = {
      name: newCategory,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/category/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.user?.token}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      toast.error("دسته ویرایش نشد");
      return;
    }
    toast.success("با موفقیت دسته ویرایش شد");
    category.forEach((i: categoryType) => {
      if (i.id === id) {
        i.name = newCategory;
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
