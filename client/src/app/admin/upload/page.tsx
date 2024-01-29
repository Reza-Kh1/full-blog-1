"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

export default function Page() {
  const { data }: any = useSession();
  const [page, setPage] = useState<number>(1);
  const [image, setImage] = useState<any>([]);
  const [allPage, setAllPage] = useState<number>();
  const [count ,setCount]=useState<number>()
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files;
    if (!files) return;
    let formData = new FormData();
    for (let file of files) {
      formData.append("file", file);
    }
    const res: any = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/upload/array`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data?.user?.token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      toast.error("خطا لطفا به ادمین گزارش دهید");
      return;
    }
    toast.success("عکس با موفقیت افزوده شد");
  };
  const getImage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/upload?page=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.user?.token}`,
      },
    });
    if (!res.ok) {
      toast.error("خطا لطفا به ادمین گزارش دهید");
      return;
    }
    const gog = await res.json();
    setAllPage(gog.data.pagination.allPage);
    setCount(gog.data.count)
    setImage(gog.data.rows);
  };
  const getMore = async (pager: number) => {
    setPage((prev) => page + 1);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/upload?page=${pager}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.user?.token}`,
        },
      }
    );
    const datas = await res.json();
    const images = datas.data.rows;
    setImage((prev: any) => [...prev, ...images]);
  };
  const deleteImage = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/upload/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.user?.token}`,
      },
    });
    if (!res.ok) {
      toast.error("عکس حذف نشد لطفا دوباره تلاش کنید");
    }
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
            {count && count }
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
                    <Image
                      src={`${process.env.NEXT_PUBLIC_URL}/${i.url}`}
                      layout="fill"
                      objectFit="cover"
                      alt="photo"
                      className="rounded-md shadow-lg border border-gray-700"
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
