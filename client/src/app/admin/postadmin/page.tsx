"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { PaginationType, postPageType } from "@/app/type";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Pagination from "@/components/pagination/page";

type PostState = {
  count: number;
  pagination: PaginationType;
  rows: postPageType[];
};
export default function Page() {
  const { data }: any = useSession();
  const [response, setResponse] = useState<PostState | null>();
  const [status, setStatus] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const getData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/post/admin-all?page=${page}&status=${status}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.user.token}`,
        },
      }
    );
    const gog = await res.json();
    if (!res.ok) {
      if (gog.message) {
        toast.error(gog.message);
      } else {
        toast.error("با دیتابیس ارتباط برقرار نشد لطفا دوباره تلاش کنید");
      }
      setResponse(null);
      return;
    }
    setResponse(gog.data);
  };
  const deletePost = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.user.token}`,
      },
    });
    if (!res.ok) {
      toast.error("پست حذف نشد");
      return;
    }
    toast.success("پست با موفقیت حذف شد");
    const newPost = response?.rows.filter((i) => {
      return i.id !== id;
    });
    if (response?.count && newPost) {
      setResponse({ ...response, count: response?.count - 1, rows: newPost });
    }
  };
  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [status, page]);
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <span className="text-lg text-gray-300">نمایش تمامیه پست ها</span>
          <span className="text-lg text-gray-300">
            تعداد پست ها {response?.count}
          </span>
          <select
            aria-label="label for the select" onChange={() => setStatus((prev) => !prev)}
            name="category"
            className="bg-gray-50 border cursor-pointer w-1/6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={"false"}>منتشر نشده ها</option>
            <option value={"true"}>منتشر شده ها</option>
          </select>
        </div>
        {response &&
          response.rows.map((i) => (
            <div
              className="w-full my-2 flex bg-slate-500 rounded-lg shadow-md p-2"
              key={i.id}
            >
              <div className="w-8/12">
                <div className="w-full flex">
                  {i.createdAt && (
                    <span className="w-3/6">
                      ساخته شده :{" "}
                      {new Date(i.createdAt).toLocaleDateString("fa")}
                    </span>
                  )}
                  <span className="w-3/6">
                    ویرایش شده :{new Date(i.updatedAt).toLocaleDateString("fa")}
                  </span>
                </div>
                <div className="w-8/12 my-3 inline-block">
                  موضوع :
                  <span className="bg-gray-400 text-gray-900 p-1 rounded-md">
                    {i.subject}
                  </span>
                </div>
                <div className="w-4/12 my-3 inline-block">
                  وضعیت :
                  <span className="bg-gray-400 text-gray-900 p-1 rounded-md mr-2">
                    {i.status ? "منتشر شده" : "منتشر نشده"}
                  </span>
                </div>
                <div className="w-6/12 inline-block my-3">
                  اسلاگ مقاله :
                  <span className="bg-gray-400 text-gray-900 p-1 rounded-md">
                    {i.slug}
                  </span>
                </div>
                <div className="w-6/12 inline-block my-3">
                  عنوان مقاله (سربرگ) :
                  <span className="bg-gray-400 text-gray-900 p-1 rounded-md">
                    {i.title}
                  </span>
                </div>
                <div className="w-6/12 inline-block my-3">
                  نویسنده :
                  <span className="bg-gray-400 text-gray-900 p-1 rounded-md">
                    {i.user.name}
                  </span>
                </div>
                <div className="w-6/12 inline-block my-3">
                  کلمات کلیدی در مقاله :
                  <span className="bg-gray-400 text-gray-900 p-1 rounded-md">
                    {i.keywords}
                  </span>
                </div>
                <div className="w-full my-3">
                  توضیحات :
                  <span className="bg-gray-400 text-gray-900 p-1 rounded-md">
                    {i.description}
                  </span>
                </div>
                <div className="w-full flex justify-between mt-5">
                  <Link
                    href={"/admin/post/" + i.slug}
                    className="bg-blue-600 py-1 px-4 rounded-md shadow-lg text-gray-300"
                  >
                    ویرایش
                    <i>
                      <FaPen className="inline mr-2" />
                    </i>
                  </Link>
                  <button
                    onClick={() => deletePost(i.id)}
                    className="bg-red-700 py-1 px-4 rounded-md cursor-pointer shadow-lg text-gray-300"
                  >
                    حذف
                    <i>
                      <FaTrash className="inline mr-2" />
                    </i>
                  </button>
                </div>
              </div>
              <div className="w-4/12">
                <figure className="flex items-center flex-col">
                  {i.imgSrc && (
                    <Image
                      src={i.imgSrc}
                      alt="a"
                      width={250}
                      height={250}
                      className="rounded-md shadow-md"
                    />
                  )}
                  <span>{i.imgAlt}</span>
                </figure>
              </div>
            </div>
          ))}
        {response?.pagination.allPage && (
          <Pagination
            setPage={setPage}
            page={page}
            pagination={response?.pagination}
          />
        )}
      </div>
    </>
  );
}
