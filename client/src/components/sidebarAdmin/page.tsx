"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
type LinkUrl = {
  value: string;
  className?: string;
  url: string;
  classActive?: string;
  classNormal?: string;
};
export default function SidebarAdmin() {
  const path = usePathname();
  const LinkUrl = ({
    value,
    classActive,
    classNormal,
    className,
    url,
  }: LinkUrl) => {
    return (
      <>
        <Link
          href={url}
          className={`${
            path === url
              ? classActive
                ? classActive
                : "text-lime-200"
              : classNormal
              ? classNormal
              : "text-gray-500" + className
              ? className
              : "bg-gray-200 p-3 rounded-md"
          }
      `}
        >
          {value}
        </Link>
      </>
    );
  };
  return (
    <>
      <div className="flex flex-col gap-2 sideBar-admin">
        <LinkUrl value="داشبورد" url="/admin" />
        <LinkUrl value="مقاله ها" url="/admin/post" />
        <LinkUrl value="مقاله تست" url="/admin/postadmin" />
        <LinkUrl value="کاربران" url="/admin/user" />
        <LinkUrl value="کامنت ها" url="/admin/review" />
        <LinkUrl value="دسته بندی" url="/admin/category" />
        <LinkUrl value="آپلود عکس" url="/admin/upload" />
        <span className="cursor-pointer" onClick={() => signOut()}>
          خروج
        </span>
      </div>
    </>
  );
}
