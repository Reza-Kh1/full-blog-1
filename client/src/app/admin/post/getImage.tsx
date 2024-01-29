"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { GetImageAdmin } from "@/app/type";
type GetImageType = {
  setImage: (value: boolean) => void;
  setImg: (value: string) => void;
  showImage: boolean;
};
export default function GetImage({
  setImage,
  showImage,
  setImg,
}: GetImageType) {
  const [allImg, setAllImg] = useState<GetImageAdmin>();
  const { data }: any = useSession();
  const getImage = async (id?: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/upload${id ? "?page=" + id : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.user?.token}`,
        },
      }
    );
    if (!res.ok) {
      toast.error("خطا لطفا به ادمین گزارش دهید");
      return;
    }
    const gog = await res.json();
    if (id && allImg?.rows) {
      setAllImg({
        ...allImg,
        pagination: gog.data.pagination,
        rows: [...allImg?.rows, ...gog.data.rows],
      });
      return;
    }

    setAllImg(gog.data);
  };

  useEffect(() => {
    getImage();
  }, []);
  return (
    <>
      {showImage && (
        <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 bg-[#0c0c0ca8] -translate-y-1/2 w-full h-screen flex items-center justify-center">
          <div className="flex flex-wrap gap-5 mt-10 w-1/2 bg-slate-700 p-3 rounded-md h-3/4 overflow-auto">
            <div className="flex justify-between w-full">
              <span>نمایش</span>
              <span>
                <i
                  className="bg-gray-300 text-gray-950 px-3 rounded-md cursor-pointer py-1"
                  onClick={() => setImage(false)}
                >
                  <AiOutlineClose className="inline text-xl" />
                </i>
              </span>
            </div>
            {allImg?.rows &&
              allImg.rows.map((i, index) => (
                <div className="relative" key={i.id}>
                  <div className="w-[300px] h-[250px] relative">
                    <Image
                      onClick={() => setImg(`${process.env.NEXT_PUBLIC_URL}/${i.url}`)}
                      src={`${process.env.NEXT_PUBLIC_URL}/${i.url}`}
                      layout="fill"
                      objectFit="cover"
                      alt="photo"
                      className="rounded-md shadow-lg border border-gray-700"
                    />
                  </div>
                </div>
              ))}
            <div className="w-full">
              {Number(allImg?.pagination.allPage) !==
                Number(allImg?.pagination?.nextPage) && allImg?.rows.length ? (
                <button
                  className="bg-blue-300 p-1 px-3 rounded-md mt-3"
                  onClick={() => {
                    if (allImg.pagination.nextPage) {
                      getImage(allImg.pagination.nextPage);
                    }
                  }}
                >
                  نمایش بیشتر
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
