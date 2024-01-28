"use client";
import React, { useEffect, useState } from "react";
import FormPost from "../form";
import { useSession } from "next-auth/react";
import { postPageType } from "@/app/type";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
export default function Page() {
  const [edit, setEdit] = useState<postPageType | null>();
  const { slug } = useParams();
  const { data }: any = useSession();
  const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/post/admin/${slug}`, {
      method: "GET",
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
        toast.error("هیچ اطلاعاتی یافت نشد");
      }
    }
    setEdit(gog.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="w-full bg-slate-600 rounded-md p-2">
        <span>صفحه ویرایش اطلاعات</span>
        {edit && <FormPost edit={edit} />}
      </div>
    </>
  );
}
