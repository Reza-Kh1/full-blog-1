import React, { useEffect, useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import EditCategory from "../EditCategory/EditCategory";
import { BiRefresh } from "react-icons/bi";
import PostBox from "../PostBox/PostBox";
import { PaginationType, PostBoxType } from "../../type";
import Pagination from "../Pagination/Pagination";
import { fetchApi } from "../Fetch/FetchApi";
type Rows = {
  id: number;
  name: string;
  category: {
    name: string;
  };
};
type SubCategoryType = {
  count: number;
  pagination: PaginationType;
  rows: Rows[];
};
export default function SubCategory() {
  const [id, setId] = useState<number>();
  const [show, setShow] = useState<boolean>(false);
  const [subCategory, setSubCategory] = useState<SubCategoryType>();
  const [postBox, setPostBox] = useState<PostBoxType[]>();
  const [page, setPage] = useState<number>(1);
  const getSubCategory = async () => {
    const data = await fetchApi({
      url: `/sub-category?page=${page}`,
      method: "GET",
    });
    if (data.error) return;
    setSubCategory(data.json.data);
  };
  const editSubCategory = async (form: { category: string }) => {
    const body = {
      name: form.category,
    };
    const data = await fetchApi({
      url: `/sub-category/${id}`,
      method: "PUT",
      body,
    });
    if (data.error) return;
    toast.success("زیر دسته با موفقیت آپدیت شد");
    subCategory?.rows.forEach((i) => {
      if (i.id === id) {
        i.name = form.category;
      }
    });
    setShow(false);
  };
  const deleteSubCategor = async (id: number) => {
    const data = await fetchApi({
      url: `/sub-category/${id}`,
      method: "DELETE",
    });
    if (data.error) return;
    toast.success("زیر دسته با موفقیت آپدیت شد");
    const gog = subCategory?.rows.filter((i: Rows) => {
      return i.id !== id;
    });
    setSubCategory({ ...subCategory, rows: gog } as SubCategoryType);
  };
  const getPost = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "defualt" || !value) return;
    const data = await fetchApi({
      url: `/sub-category/${e.target.value}/admin`,
      method: "GET",
    });
    if (data.error) return;
    setPostBox(data.json.post.rows);
  };
  useEffect(() => {
    getSubCategory();
  }, [page]);
  return (
    <>
      <div className="w-full p-2 rounded-md bg-slate-600 mt-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-200 text-lg my-3">تمام زیر دسته ها</span>
          <button
            onClick={getSubCategory}
            className="bg-blue-300 py-1 px-4 rounded-md text-sm"
          >
            بروز رسانی
            <BiRefresh className="inline mr-1" />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-right text-sm font-light">
                  <thead className="border-b bg-gray-500 font-medium">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        تعداد
                      </th>
                      <th scope="col" className="px-6 py-4">
                        نام زیردسته
                      </th>
                      <th scope="col" className="px-6 py-4">
                        دسته مادر
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-b bg-blue-200">
                    {subCategory?.rows &&
                      subCategory?.rows.map((i) => (
                        <tr key={i?.id} className="border-b bg-blue-200">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i?.id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div
                              className="flex p-2 rounded-md bg-blue-200"
                              key={i?.id}
                            >
                              <span>{i?.name}</span>
                              <div className="mr-2 border-gray-950 pr-2 border-r">
                                <i onClick={() => deleteSubCategor(i?.id)}>
                                  <FaTrash className="inline ml-3 text-red-500 cursor-pointer" />
                                </i>
                                <i
                                  onClick={() => {
                                    setId(i?.id), setShow(true);
                                  }}
                                >
                                  <FaPen className="inline text-blue-600 cursor-pointer" />
                                </i>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {i?.category?.name}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <EditCategory
          show={show}
          setShow={setShow}
          editCategory={editSubCategory}
        />
        {subCategory?.pagination && (
          <Pagination
            pagination={subCategory?.pagination}
            setPage={setPage}
            page={page}
          />
        )}
      </div>
      <div className="w-full p-2 rounded-md bg-slate-600 mt-3">
        <div className="flex justify-between items-center">
          <label htmlFor="select" className="text-gray-200 text-lg">
            نمایش محصولات زیردسته ها
          </label>
          <div className="w-3/12">
            <select
              required
              onChange={getPost}
              name="id"
              id="select"
              className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={"defualt"}>انتخاب کنید</option>
              {subCategory?.rows &&
                subCategory?.rows.map((i) => (
                  <option value={i.name} key={i.id}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="w-full flex flex-wrap mt-2">
          {postBox && postBox.map((i, index) => <PostBox key={index} {...i} />)}
        </div>
      </div>
    </>
  );
}
