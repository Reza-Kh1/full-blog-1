"use client";
import { CommentPageType, PaginationType } from "@/app/type";
import Pagination from "@/components/pagination/page";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaExclamation, FaTrash, FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import ReplyComment from "./replyComment";
export type CommentType = {
  count: number;
  pagination: PaginationType;
  rows: CommentPageType[];
};
export type ReplyCommentType = {
  comment: string | null;
  user: {
    name: any;
    phone: any;
  };
  id: number | null;
  status: boolean;
};
export default function Page() {
  const [comments, setComments] = useState<CommentType | null>(null);
  const [showComment, setShowComment] = useState<ReplyCommentType>({
    comment: null,
    id: null,
    user: {
      name: null,
      phone: null,
    },
    status: false,
  });
  const [page, setPage] = useState<number>(1);
  const { data }: any = useSession();
  const [status, setStatus] = useState<boolean>(false);
  const replyComment = async (
    comment: string,
    id: number,
    user: { name: string; phone: string }
  ) => {
    const body = {
      comment: "its so replay 20",
      reply: id,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.user?.token}`,
      },
      body: JSON.stringify(body),
    });
    const gog = await res.json();
    if (!res.ok) {
      if (gog.message) {
        toast.error(gog.message);
      } else {
        toast.error("اتصال به دیتابیس برقرار نشد");
      }
      return;
    }
    comments?.rows.map((i) => {
      if (i.id === id) {
        i.comment = comment;
      }
    });
  };
  const getData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/reviews/admin?page=${page}&status=${status}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.user?.token}`,
        },
      }
    );
    const gog = await res.json();
    if (!res.ok) {
      if (gog.message) {
        toast.error(gog.message);
      } else {
        toast.error("اتصال به دیتابیس برقرار نشد");
      }
      return;
    }
    setComments(gog.data);
  };
  const deleteComment = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.user?.token}`,
      },
    });
    const gog = await res.json();
    if (!res.ok) {
      if (gog.message) {
        toast.error(gog.message);
      } else {
        toast.error("اتصال به دیتابیس برقرار نشد");
      }
      return;
    }
    toast.success("کامنت مورد نظر حذف شد");
    const newComment = comments?.rows.filter((i) => {
      return i.id !== id;
    });
    if (comments?.count && newComment) {
      setComments({
        ...comments,
        rows: newComment,
        count: comments?.count - 1,
      });
    }
  };
  const acceptComment = async (id: number, status: boolean) => {
    const body = {
      status: status ? "false" : "true",
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.user?.token}`,
      },
      body: JSON.stringify(body),
    });
    const gog = await res.json();
    if (!res.ok) {
      if (gog.message) {
        toast.error(gog.message);
      } else {
        toast.error("اتصال به دیتابیس برقرار نشد");
      }
      return;
    }
    toast.success("کامنت تایید شد");
    const newComment = comments?.rows.filter((i) => {
      return i.id !== id;
    });
    if (comments?.count && newComment) {
      setComments({
        ...comments,
        rows: newComment,
        count: comments?.count - 1,
      });
    }
  };
  useEffect(() => {
    getData();
  }, [page, status]);
  return (
    <>
      <div className="w-full bg-slate-600 rounded-md">
        <div className="flex justify-between p-4">
          <span className="text-gray-200">نمایش جدیدترین کامنت ها</span>
          <span className="text-gray-200">{comments?.count} کامنت دارید</span>
          <select
            aria-label="label for the select"
            onChange={() => setStatus((prev) => !prev)}
            name="category"
            className="bg-gray-50 border cursor-pointer w-1/6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={"false"}>تایید نشده</option>
            <option value={"true"}>تایید شده</option>
          </select>
        </div>
        <div className="w-full p-2">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full rounded-table text-right text-sm font-light">
                    <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-zinc-600">
                      <tr>
                        <th
                          scope="col"
                          className="px-1 py-4 text-gray-50 text-center"
                        >
                          لیست
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-4 text-gray-50 text-center"
                        >
                          نام
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-4 text-gray-50 text-center"
                        >
                          شماره تلفن
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 text-gray-50 text-center"
                        >
                          موقعیت
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 text-gray-50 text-center"
                        >
                          کامنت
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-4 text-gray-50 text-center"
                        >
                          وضعیت
                        </th>
                        <th
                          scope="col"
                          className="px-8 py-4 text-gray-50 text-center"
                        >
                          عملیات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comments?.rows &&
                        comments.rows.map((i, index) => (
                          <tr key={i.id}>
                            <td
                              scope="col"
                              className="px-2 py-4 border-l text-center"
                            >
                              {index + 1}
                            </td>
                            <td scope="col" className="px-2 py-4">
                              {i.user.name}
                            </td>
                            <td scope="col" className="px-2 py-4">
                              {i.user.phone}
                            </td>
                            <td scope="col" className="px-2 py-4">
                              {i.replyId ? "ریپلای" : "کامنت"}
                            </td>
                            <td scope="col" className="px-2 py-4">
                              <p className="m-0 table-comment text-justify">
                                {i?.comment}
                              </p>
                            </td>
                            <td scope="col" className="px-1 py-4">
                              <span
                                className={`px-2 py-1 ${i.status ? "bg-green-300" : "bg-red-300"
                                  } rounded-md`}
                              >
                                {i.status ? "تایید شده" : "تایید نشده"}
                              </span>
                            </td>
                            <td scope="col" className="px-1 py-4">
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() =>
                                    setShowComment({
                                      comment: i.comment,
                                      user: {
                                        name: i.user.name,
                                        phone: i.user.phone,
                                      },
                                      id: i.id,
                                      status: true,
                                    })
                                  }
                                  className="bg-blue-500 text-gray-50 px-3 py-1 mx-auto rounded-sm"
                                >
                                  پاسخ
                                  <i>
                                    <FaExclamation className="inline" />
                                  </i>
                                </button>
                                <button
                                  onClick={() => deleteComment(i.id)}
                                  className="bg-red-500 text-gray-50 px-3 py-1 mx-auto rounded-sm"
                                >
                                  حذف
                                  <i>
                                    <FaTrash className="inline mr-1" />
                                  </i>
                                </button>
                                <button
                                  onClick={() => acceptComment(i.id, i.status)}
                                  className="bg-green-500 text-gray-50 px-3 py-1 mx-auto rounded-sm"
                                >
                                  تایید
                                  <i>
                                    <FaCheck className="inline mr-1" />
                                  </i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {comments?.pagination.allPage && (
          <Pagination
            pagination={comments?.pagination}
            page={page}
            setPage={setPage}
          />
        )}
        {showComment.status && comments && (
          <ReplyComment info={showComment} setAllComment={setComments} allComments={comments} setComments={setShowComment} />
        )}
      </div>
    </>
  );
}
