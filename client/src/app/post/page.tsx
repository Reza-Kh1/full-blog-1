import Link from "next/link";
import React from "react";
import { PaginationType, postPageType } from "../type";
import Image from "next/image";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
type PostType = {
  data: {
    count: number;
    rows: postPageType[];
    pagination: PaginationType;
  };
};
type PostPage = {
  searchParams: {
    page?: number;
  };
};
const getData = async ({ searchParams }: PostPage) => {
  let page: any = searchParams.page;
  if (!searchParams.page) {
    page = 1;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/post?page=` + page, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 86000 },
  });
  const data = await res.json();
  return data;
};
export default async function page({ searchParams }: PostPage) {
  const { data }: PostType = await getData({ searchParams });
  let page: number | undefined = searchParams.page;
  if (!searchParams.page) {
    page = 1;
  }
  return (
    <>
      <div className="w-full">
        <h3 className="mt-5 bg-green-200 p-3 rounded-sm">تمام پست ها</h3>
        <div className="w-full mt-3 flex flex-wrap">
          {data?.rows.length ? (
            data.rows.map((i, index) => (
              <div className="w-4/12 p-2" key={index}>
                <div className="p-2 rounded-md bg-slate-300 post-box shadow-lg">
                  <div className="text-center mb-4 mt-2">
                    <span className="text-lg text-gray-800">{i?.subject}</span>
                  </div>
                  <figure className="min-h-[225px]">
                    {i.imgSrc && (
                      <Link href={"/post/" + i.slug}>
                        <Image
                          src={i.imgSrc}
                          width={250}
                          height={250}
                          loading="lazy"
                          alt={i?.slug}
                          className="w-full rounded-md shadow-md border border-gray-700 mb-1"
                        />
                      </Link>
                    )}
                  </figure>
                  <div className="flex justify-between">
                    <span>نویسنده : {i.user.name}</span>
                    <span>
                      {new Date(i.updatedAt).toLocaleDateString("fa")}
                    </span>
                  </div>
                  <p className="text-justify text-gray-600 mt-3">
                    {i?.description}
                  </p>
                  <div className="flex justify-between items-centers mt-4">
                    <Link
                      href={"/post/" + i.slug}
                      className="py-1 px-3 rounded-md bg-blue-300 inline-block hover:bg-blue-400 transition-all"
                    >
                      ادامه مطلب
                    </Link>
                    <span>{i?.subCategory?.name}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full mt-10">
              <h3>هیچ محصولی برای نمایش وجود ندارد</h3>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center py-2">
          {data?.pagination?.prevPage && page && (
            <Link
              href={{ pathname: "post", query: `page=${Number(page) - 1}` }}
              className="bg-blue-300 py-3 px-3 rounded-full mx-2"
            >
              <i>
                <FaAnglesRight />
              </i>
            </Link>
          )}
          {data?.pagination?.allPage &&
            page &&
            Array.from(
              { length: data.pagination.allPage },
              (_, i) => i + 1
            ).map((i) => {
              return (
                <Link
                  scroll={i !== Number(page)}
                  aria-disabled={i === Number(page)}
                  href={{ pathname: "post", query: `page=${i}` }}
                  key={i}
                  className={`py-2 px-4 rounded-full mx-2 ${i === Number(page)
                      ? "bg-gray-600 text-gray-200"
                      : "bg-blue-300"
                    }`}
                >
                  {i}
                </Link>
              );
            })}
          {data?.pagination?.nextPage && page && (
            <Link
              href={{ pathname: "post", query: `page=${Number(page) + 1}` }}
              className="bg-blue-300 py-3 px-3 rounded-full mx-2"
            >
              <i>
                <FaAnglesLeft />
              </i>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
