"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PaginationType, PostBoxType } from "../../type";
import Pagination from "@/components/pagination/page";
import Link from "next/link";
import Image from "next/image";
type SerachType = {
  count: number;
  rows: PostBoxType[];
  pagination: PaginationType;
};
type SearchQueryType = {
  params: {
    search: string;
  };
};
export default function Search({ params }: SearchQueryType) {
  const [search, setSearch] = useState<SerachType>();
  const [page, setpage] = useState<number>(1);
  const getData = async () => {
    if (!params.search) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/post/search/${params.search}?page=${page}`
    );
    if (!res.ok) {
      toast.error("مشکلی پیش آمده با ادمین تماس بگیرید");
    }
    const data = await res.json();
    setSearch(data.data);
  };
  useEffect(() => {
    getData();
  }, [page]);
  return (
    <>
      <div className="w-full">
        <div className="mt-5 bg-green-100 p-5 rounded-sm flex justify-between">
          <span>
            شما
            <span className="text-blue-500 text-lg">{params?.search}</span>
            را جستجو کردید
          </span>
          <span>{search?.count} تا مقاله یافت شد</span>
        </div>
        <div className="w-full mt-3 flex flex-wrap">
          {search?.rows.length ? (
            search.rows.map((i, index) => (
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
                    <span>نویسنده : {i?.user.name}</span>
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
        {search?.pagination.allPage && (
          <Pagination
            setPage={setpage}
            pagination={search?.pagination}
            page={page}
          />
        )}
      </div>
    </>
  );
}
