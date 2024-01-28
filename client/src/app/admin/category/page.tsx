"use client";
import InputLabel from "@/components/inputLabel/page";
import SubmitButton from "@/components/submitButton/page";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AdminCategory from "./category";
import SubCategory from "./subCategory";
type categoryType = {
  id: number;
  name: string;
};
export default function Page() {
  const { data }: any = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState<any>();
  const handleAction = async (form: FormData) => {
    const name = form.get("name");
    const id = form.get("id");
    if (id === "defualt" || !name) {
      return toast.error("فیلد های لازم را پر کنید")
    };
    let body = {
      name,
      id: Number(id) !== 0 ? id : null,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/${id ? "sub-category" : "category"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.user?.token}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      return toast.error("عمللیات با خطا روبرو شد");
    }
    toast.success("دسته افزوده شد");
    if (!id) {
      getCategory();
    }
  };
  const getCategory = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.user?.token}`,
      },
    });
    const gog = await res.json();
    setCategory(gog.data.rows);
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
                ref={ref}
                action={(form) => {
                  handleAction(form), ref.current?.reset();
                }}
                className="w-8/12 mt-2"
              >
                <InputLabel type="text" name="name" required />
                <SubmitButton
                  value="ثبت دسته اصلی"
                  classs="bg-gray-200 py-1 px-4 rounded-md mt-3 shadow-md"
                  types="submit"
                />
              </form>
            </div>
          </div>
          <div className="w-1/2 pr-2">
            <div className="bg-slate-600 p-2 rounded-md">
              <form
                ref={ref}
                action={(form) => {
                  handleAction(form), ref.current?.reset();
                }}
                className="flex flex-wrap justify-between"
              >
                <div className="w-1/2">
                  <span className="text-gray-100">زیر دسته جدید</span>
                  <InputLabel type="text" name="name" />
                </div>
                <div className="w-5/12">
                  <label
                    htmlFor="default"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    یک دسته اصلی را انتخاب کنید
                  </label>
                  <select
                    required
                    name="id"
                    id="default"
                    className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={"defualt"}>انتخاب کنید</option>
                    {category &&
                      category.map((i: categoryType) => (
                        <option value={i.id} key={i.id}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="w-full">
                  <SubmitButton
                    value="ثبت زیر دسته"
                    classs="bg-gray-200 py-1 px-4 rounded-md mt-3 shadow-md"
                    types="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <AdminCategory category={category} setCategory={setCategory} />
        <SubCategory />
      </div>
    </>
  );
}
