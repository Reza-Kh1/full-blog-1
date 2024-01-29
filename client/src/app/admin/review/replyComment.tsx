"use client"
import React, { useEffect } from "react";
import { CommentType, ReplyCommentType } from "./page";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import SubmitButton from "@/components/submitButton/page";
import { IoMdClose } from "react-icons/io";
type ReplyType = {
  info: ReplyCommentType;
  setComments: (value: ReplyCommentType) => void;
  setAllComment: (Value: CommentType) => void;
  allComments: CommentType;
};
export default function ReplyComment({
  info,
  setComments,
  setAllComment,
  allComments,
}: ReplyType) {
  const { data }: any = useSession();
  const actionFrom = async (form: FormData) => {
    const comment = form.get("comment");
    const reply = form.get("reply");
    if (reply) {
      const body = {
        reply: info.id,
        comment: reply,
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/reviews/1`, {
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
    }
    if (comment) {
      const body = {
        comment: comment !== info.comment ? comment : "",
        status: "true",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/reviews/${info.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data?.user?.token}`,
          },
          body: JSON.stringify(body),
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
    }
    const newComents = allComments.rows.filter((i) => {
      return i.id !== info.id;
    });
    setAllComment({
      ...allComments,
      count: allComments.count - 1,
      rows: newComents,
    });
    setComments({
      comment: null,
      id: null,
      user: { name: null, phone: null },
      status: false,
    });
    toast.success("عملیات انجام شد");
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <>
      <div className="fixed transform bg-[#000000b8] z-50 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center left-1/2 top-1/2">
        <div className="bg-gray-700 p-3 rounded-md w-6/12 h-3/4 overflow-auto">
          <div className="mb-5">
            <i
              className="bg-gray-100 px-3 py-1 cursor-pointer rounded-md"
              onClick={() => {
                setComments({
                  comment: null,
                  id: null,
                  user: { name: null, phone: null },
                  status: false,
                });
              }}
            >
              <IoMdClose className="inline" />
            </i>
          </div>
          <span className="text-gray-200 block mb-2">کامنت گزاشته شده</span>
          <form action={actionFrom}>
            <textarea
              aria-label="Label Text"
              rows={5}
              defaultValue={info.comment ? info.comment : undefined}
              name="comment"
              className="w-full p-2 rounded-md"
            />
            <span className="mb-2 mt-5 text-gray-200 block">
              پاسخ خود را وارد کنید
            </span>
            <textarea aria-label="label for the text" rows={5} name="reply" className="w-full p-2 rounded-md" />
            <div>
              <SubmitButton
                value="ویرایش کاربر"
                types="submit"
                classs="bg-blue-300 mt-5 mx-auto px-4 py-1 rounded-md"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
