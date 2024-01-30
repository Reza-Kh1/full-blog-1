import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { fetchApi } from "../../Components/Fetch/FetchApi";

export default function Page() {
  const [page, setPage] = useState<number>(1);
  const [image, setImage] = useState<any>([]);
  const [allPage, setAllPage] = useState<number>();
  const [count, setCount] = useState<number>()
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files;
    if (!files) return;
    let formData = new FormData();
    for (let file of files) {
      formData.append("file", file);
    }
    const data = await fetchApi({ url: "/upload/array", method: "POST", body: formData })
    if (data.error) return
    toast.success("عکس با موفقیت افزوده شد");
  };
  const getImage = async () => {
    const data = await fetchApi({ url: "/upload?page=1", method: "GET" })
    if (data.error) return
    setAllPage(data.json.data.pagination.allPage);
    setCount(data.json.data.count)
    setImage(data.json.data.rows);
  };
  const getMore = async (pager: number) => {
    setPage(page + 1);
    const data = await fetchApi({ url: `/upload?page=${pager}`, method: "GET" })
    if (data.error) return
    const images = data.json.data.rows;
    setImage((prev: any) => [...prev, ...images]);
  };
  const deleteImage = async (id: number) => {
    const data = await fetchApi({ url: `/upload/${id}`, method: "DELETE" })
    if (data.error) return
    const newImage = await image.filter((i: { id: number; url: string }) => {
      return i.id !== id;
    });
    toast.success("عکس با موفقیت حذف شد");
    setImage(newImage);
  };
  return (
    <>
      <div className="w-full">
        <div className="text-center w-3/12">
          <label
            htmlFor="upload"
            className="p-3 py-6 mb-2 justify-center flex border border-dashed rounded-md cursor-pointer"
          >
            <i>
              <BsUpload className="text-[30px] text-gray-50" />
            </i>
            <input
              type="file"
              onChange={uploadImage}
              multiple
              id="upload"
              hidden
            />
          </label>
          <label
            htmlFor="upload"
            className="text-xs text-slate-400 cursor-pointer"
          >
            عکس خود را آپلود کنید
          </label>
        </div>
        <div className="w-full mt-5 bg-slate-600 p-2 rounded-md">
          <span className="block text-gray-100 text-lg">
            نمایش عکس های آپلود شده
            <span className="inline-block mr-1">
              {count && count}
            </span>
          </span>

          {!image.length && (
            <button
              className="py-2 px-5 rounded-md bg-blue-300 mt-3"
              onClick={getImage}
            >
              نمایش
            </button>
          )}
          <div className="flex flex-wrap gap-5 mt-10">
            {image &&
              image.map((i: { id: number; url: string }) => (
                <div className="relative" key={i.id}>
                  <div className="w-[300px] h-[250px] relative">
                    <img
                      src={`${process.env.VITE_PUBLIC_URL}/${i.url}`}
                      alt="photo"
                      className="rounded-md shadow-lg border border-gray-700 object-cover"
                    />
                    <span
                      onClick={() => deleteImage(i.id)}
                      className="cursor-pointer absolute bottom-0 left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-xs p-1 px-3 rounded-lg text-gray-200"
                    >
                      حذف
                      <i>
                        <FaTrash className="inline mr-1 text-xs" />
                      </i>
                    </span>
                  </div>
                </div>
              ))}
          </div>
          {Number(allPage) !== Number(page) && image.length ? (
            <button
              className="bg-blue-300 p-1 px-3 rounded-md mt-3"
              onClick={() => getMore(page + 1)}
            >
              نمایش بیشتر
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
