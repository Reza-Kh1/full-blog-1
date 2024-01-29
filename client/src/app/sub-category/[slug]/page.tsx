import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
type SubCategorySlug = {
  params: {
    slug: string;
  };
};
type PostSubCategory = {
  count: number;
  rows: {
    subject: string;
    imgSrc: string;
    slug: string;
    description: string;
    user: {
      name: string;
    };
  }[];
};
type DataSubCategory = {
  name: string;
  id: number;
  category: {
    name: string;
  };
};
const getData = async (slug: { slug: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/sub-category/` + slug.slug,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    notFound();
  }
  const json = await res.json();
  return json;
};
export async function generateMetadata({ params }: SubCategorySlug) {
  const { data }: { data: DataSubCategory } = await getData(params);
  if (!data) {
    notFound();
  }
  return {
    title: data.name,
    description: `This is the ${data.name} subcategory page!`,
    keywords: data.name,
  };
}
export default async function page({ params }: SubCategorySlug) {
  const { data, post }: { post: PostSubCategory; data: DataSubCategory } =
    await getData(params);
  return (
    <>
      <div className="w-full">
        <h3 className="mb-5 bg-green-200 p-3 rounded-sm mt-4">
          نمایش تمامیه پست های مربوط به دسته {data.name}
        </h3>
        <div className="w-full flex flex-wrap">
          {post.rows.length ? (
            post.rows.map((i, index) => (
              <div className="w-4/12 p-2" key={index}>
                <div className="p-2 rounded-md bg-slate-300 post-box shadow-lg">
                  <div className="text-center mb-4 mt-2">
                    <span className="text-lg text-gray-800">{i.subject}</span>
                  </div>
                  <figure>
                    <Link href={"/post/" + i.slug}>
                      <Image
                        src={i.imgSrc}
                        width={250}
                        height={250}
                        loading="lazy"
                        alt={i.slug}
                        className="w-full rounded-md shadow-md border border-gray-700 mb-1"
                      />
                    </Link>
                  </figure>
                  <span>نویسنده : {i.user.name}</span>
                  <p className="text-justify text-gray-600 mt-3">
                    {i.description}
                  </p>

                  <Link
                    href={"/post/" + i.slug}
                    className="py-1 px-3 rounded-md bg-blue-300 mt-4 inline-block hover:bg-blue-400 transition-all"
                  >
                    ادامه مطلب
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full mt-10">
              <h3>هیچ محصولی برای نمایش وجود ندارد</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
