import { useEffect, useState } from "react";
import Category from "../../Components/Category/Category";
import SubCategory from "../../Components/SubCategory/SubCategory";
import { fetchApi } from "../../Components/Fetch/FetchApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
type subCategoryType = {
  id?: number;
  name: string;
};
export default function CategoryPage() {
  const [category, setCategory] = useState<any>();
  const {
    register: categoryFrom,
    handleSubmit: handleCategory,
    formState: categoryErr,
    resetField,
  } = useForm<subCategoryType>();
  const {
    register: subCategoryFrom,
    handleSubmit: subHandleCategory,
    formState: subCategoryErr,
    reset,
  } = useForm<subCategoryType>();
  const createSubCategory = async (form: subCategoryType) => {
    let body = {
      name: form.name,
      id: form.id,
    };
    if (isNaN(Number(form.id))) {
      return;
    }
    const data = await fetchApi({ url: "/sub-category", method: "POST", body });
    if (data.error) return;
    toast.success("زیر دسته افزوده شد");
    reset();
  };
  const createCategory = async (form: subCategoryType) => {
    const body = {
      name: form.name,
    };
    const data = await fetchApi({ url: "/category", method: "POST", body });
    if (data.error) return;
    toast.success("دسته افزوده شد");
    getCategory();
    resetField("name");
  };
  const getCategory = async () => {
    const data = await fetchApi({ url: `/category`, method: "GET" });
    if (data.error) return;
    setCategory(data.json.data.rows);
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <div className="w-full flex flex-wrap">
        <div className="w-full flex">
          <div className="w-6/12 pl-2">
            <div className="bg-slate-600 p-2 rounded-md">
              <span className="text-gray-100">ساخت دسته اصلی جدید</span>
              <form
                onSubmit={handleCategory(createCategory)}
                className="w-8/12 mt-2"
              >
                <input
                  type="text"
                  className="block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
                  {...categoryFrom("name", { required: true })}
                />
                {categoryErr.errors.name && <span>فیلد رو کامل پر کنید</span>}
                <button
                  type="submit"
                  className="bg-gray-200 py-1 px-4 rounded-md mt-3 shadow-md"
                >
                  ثبت دسته اصلی
                </button>
              </form>
            </div>
          </div>
          <div className="w-1/2 pr-2">
            <div className="bg-slate-600 p-2 rounded-md">
              <form
                onSubmit={subHandleCategory(createSubCategory)}
                className="flex flex-wrap justify-between"
              >
                <div className="w-1/2">
                  <span className="text-gray-100">زیر دسته جدید</span>
                  <input
                    type="text"
                    className="block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
                    {...subCategoryFrom("name", { required: true })}
                  />
                  {subCategoryErr.errors.name && (
                    <span>تمام فیلد هارو پر کنید</span>
                  )}
                </div>
                <div className="w-5/12">
                  <label
                    htmlFor="default"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    یک دسته اصلی را انتخاب کنید
                  </label>
                  <select
                    {...subCategoryFrom("id", { required: true })}
                    id="default"
                    className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={"defualt"}>انتخاب کنید</option>
                    {category &&
                      category.map((i: subCategoryType) => (
                        <option value={i.id} key={i.id}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="bg-gray-200 py-1 px-4 rounded-md mt-3 shadow-md"
                  >
                    ثبت زیر دسته
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Category category={category} setCategory={setCategory} />
        <SubCategory />
      </div>
    </>
  );
}
