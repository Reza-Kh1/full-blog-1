import NotFound from "@/app/not-found";
import { postPageType } from "@/app/type";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
type PostSlugType = {
  params: {
    slug: string;
  };
};
const getData = async (slug: { slug: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/post/${slug.slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    notFound();
  }
  return await res.json();
};
export async function generateMetadata({ params }: PostSlugType) {
  const { data }: { data: postPageType } = await getData(params);
  return {
    title: data.title,
    description: `This is the ${data.description} category page!`,
    keywords: data.keywords,
  };
}
export default async function Page({ params }: PostSlugType) {
  const { data }: { data: postPageType } = await getData(params);
  return (
    <>
      <div className="w-full p-3 bg-slate-300 mt-5 rounded-md">
        <h1 className="mb-5 text-xl">{data.subject}</h1>
        <figure className="w-1/2 mx-auto">
          {data.imgSrc && (
            <Image
              src={data.imgSrc}
              alt={data.imgAlt || ""}
              loading="lazy"
              width={250}
              height={250}
              className="w-full rounded-md shadow-lg border border-gray-800"
            />
          )}
          <div className="flex justify-between mt-1">
            <span>نویسنده : {data.user.name}</span>
            <span>{new Date(data.updatedAt).toLocaleDateString("fa")}</span>
          </div>
        </figure>
        <p className="text-justify">{data.content}</p>
      </div>
    </>
  );
}