import NotFound from "@/app/not-found";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
type CategorySlugType = {
  slug: string;
};
type DataCategory = {
  data: {
    name: string;
    subCategories: {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      categoryId: number;
    }[];
  } | null;
};
const getData = async (slug: CategorySlugType) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/category/${slug.slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 864000 },
    }
  );
  if (!res.ok) {
    notFound();
  }
  return await res.json();
};
export async function generateMetadata({
  params,
}: {
  params: CategorySlugType;
}) {
  const data = await getData(params);
  return {
    title: data.data.name,
    description: `This is the ${data.data.name} category page!`,
    keywords: data.data.name,
  };
}
export default async function page({ params }: { params: CategorySlugType }) {
  const { data }: DataCategory = await getData(params);
  if (!data) return NotFound();
  return (
    <>
      <div className="w-full">
        <h3 className="mt-5 bg-green-200 p-3 rounded-sm">
          نمایش دسته اصلی صفحه {params.slug}
        </h3>
        <div className="w-full mt-3 flex flex-wrap">
          {data.subCategories &&
            data.subCategories.map((i) => (
              <div className="w-3/12 p-2" key={i.id}>
                <Link href={"/sub-category/" + i.name}>
                  <div className="p-3 rounded-md bg-slate-300 hover:bg-slate-400 shadow-lg flex justify-center items-center flex-col">
                    <span className="text-lg block mt-5">{i.name}</span>
                    <span className="text-gray-600 block mt-5">
                      زیر مجموعه{data.name}
                    </span>
                    <div className="flex justify-between w-full mt-3">
                      <span className="text-xs text-gray-500">
                        تاسیس {new Date(i.categoryId).toLocaleDateString("fa")}
                      </span>
                      <span className="text-xs text-gray-500">
                        ویرایش{new Date(i.updatedAt).toLocaleDateString("fa")}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
