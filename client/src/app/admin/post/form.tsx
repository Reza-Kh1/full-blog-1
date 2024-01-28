"use client";
import React, { useEffect, useState } from "react";
import GetImage from "./getImage";
import InputLabel from "@/components/inputLabel/page";
import SubmitButton from "@/components/submitButton/page";
import { BsCardImage } from "react-icons/bs";
import Image from "next/image";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { postAction } from "@/action/postAction";
import { toast } from "react-toastify";
import { unstable_noStore } from "next/cache";
import { postPageType } from "@/app/type";
type CategoryType = {
  id: number;
  name: string;
};
type FormPostType = {
  edit?: postPageType;
};
export default function FormPost({ edit }: FormPostType) {
  unstable_noStore();
  const [imagePost, setImagePost] = useState<string | null>(
    edit?.imgSrc ? edit.imgSrc : null
  );
  const [checkbox, setCheckBox] = useState<boolean>(
    edit?.status ? edit.status : false
  );
  const { data }: any = useSession();
  const [showImage, setShowImage] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryType[]>();
  const [form, setFrom] = useFormState(postAction as any, {
    succes: null,
    token: data?.user?.token ? data?.user?.token : null,
    error: null,
  });
  const getCategory = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/sub-category/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.user?.token}`,
      },
    });
    if (!res.ok) {
      toast.error("دسته بندی دریافت نشد !");
      return;
    }
    const gog = await res.json();
    setCategory(gog.data);
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <form action={setFrom} className="flex flex-wrap">
        <input type="text" name="id" hidden defaultValue={edit?.id} />
        <div className="w-6/12 p-2">
          <InputLabel
            label="موضوع مقاله :"
            type="text"
            name="subject"
            id="subject"
            required
            value={edit?.subject}
          />
        </div>
        <div className="w-3/12 p-2">
          <InputLabel
            label="عنوان مقاله (سربرگ) :"
            required
            type="text"
            name="title"
            id="title"
            value={edit?.title}
          />
        </div>
        <div className="w-3/12 p-2">
          <InputLabel
            label="عنوان تصویر :"
            id="image-alt"
            type="text"
            name="image-alt"
            required
            value={edit?.imgAlt}
          />
        </div>
        <div className="w-3/6 p-2">
          <InputLabel
            required
            type="text"
            name="slug"
            id="slug"
            label="اسلاگ مقاله :"
            value={edit?.slug}
          />
        </div>
        <div className="w-3/6 p-2">
          <InputLabel
            label="کلمات کلیدی در مقاله :"
            required
            type="text"
            name="keywords"
            id="keywords"
            value={edit?.keywords}
          />
        </div>
        <div className="w-3/6 p-2">
          <label htmlFor="description" className="text-gray-200">
            توضیحات مربوطه :
          </label>
          <textarea
            required
            style={{ resize: "none" }}
            id="description"
            rows={5}
            name="description"
            defaultValue={edit?.description ? edit.description : undefined}
            className="block p-2 rounded-md shadow-md bg-slate-200 focus:shadow-gray-500 text-gray-800 w-full mt-2"
          ></textarea>
        </div>
        <div className="w-1/6 flex items-center justify-center flex-col">
          <label htmlFor="open" className="text-gray-300">دسته پست را انتخاب کنید</label>
          {category && (
            <select
              required
              id="open"
              name="category"
              defaultValue={
                edit?.subCategoryId ? Number(edit.subCategoryId) : undefined
              }
              className="bg-gray-50 border mt-2 cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={"default"}>انتخاب کنید</option>
              {category.map((i) => (
                <option value={Number(i.id)} key={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="w-2/6 p-2 text-center">
          <span className="text-gray-200 mb-2 block">
            عکس اصلی مقاله را انتخاب کنید
          </span>
          <label
            onClick={() => setShowImage(true)}
            htmlFor="image"
            className="mb-2 justify-center flex border border-dashed rounded-md w-6/12 mx-auto cursor-pointer"
          >
            {imagePost ? (
              <Image
                alt=""
                width={200}
                height={200}
                src={imagePost}
                className="h-full w-full object-cover rounded-md"
              />
            ) : (
              <i className="px-6 py-10">
                <BsCardImage className="text-[30px] text-gray-50" />
              </i>
            )}
            <input
              type="text"
              hidden
              id="image"
              name="img-src"
              onChange={() => { }}
              value={imagePost ? imagePost : undefined}
              defaultValue={imagePost ? imagePost : ""}
            />
          </label>
          <label className="text-xs text-slate-400 cursor-pointer">
            عکس خود را انتخاب کنید
          </label>
        </div>
        <div className="w-full p-2">
          <label htmlFor="content">متن خود را وارد کنید</label>
          <textarea
            required
            id="content"
            rows={6}
            cols={100}
            name="content"
            defaultValue={edit?.content ? edit.content : undefined}
            className="block p-2 rounded-md shadow-md bg-slate-200 focus:shadow-gray-500 text-gray-800 w-full mt-2"
          ></textarea>
        </div>
        <div className="w-full p-2 flex justify-between">
          <SubmitButton
            value="ذخیره"
            types="submit"
            classs="shadow-md bg-blue-400 rounded-lg py-2 px-7 hover:shadow-blue-700"
          />
          <div>
            <label
              htmlFor="status"
              className="ml-2 text-gray-300 cursor-pointer"
            >
              منتشر شود ؟
            </label>
            <input
              onChange={() => setCheckBox((prev) => !prev)}
              type="checkbox"
              name="status"
              id="status"
              checked={checkbox}
            />
          </div>
        </div>
      </form>
      <div className="image">
        <GetImage
          setImage={setShowImage}
          showImage={showImage}
          setImg={setImagePost}
        />
      </div>
    </>
  );
}
