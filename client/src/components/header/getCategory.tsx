"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
type getCategory = {
  category: {
    id: number;
    name: string;
    subCategories: {
      name: string;
    }[];
  }[];
};
export default function GetCategory({ category }: getCategory) {
  const path = usePathname();
  const { data }: any = useSession();
  return (
    <>
      {category.map((i) => (
        <li key={i.id}>
          <Link
            href={"/category/" + i.name}
            className={`transition-all ${
              path === `/category/${i.name}` ? "text-white" : " text-slate-800"
            }`}
          >
            {i.name}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href={"/post"}
          className={`transition-all ${
            path === "/post" ? "text-white" : " text-slate-800"
          }`}
        >
          بلاگ
        </Link>
      </li>
      {data ? (
        <li>
          <Link
            href={"/profile"}
            className={`transition-all ${
              path === "/profile" ? "text-white" : " text-slate-800"
            }`}
          >
            پروفایل
          </Link>
        </li>
      ) : (
        <li>
          <span
            // href={"/sign-up"}
            onClick={() => signIn()}
            className={`transition-all cursor-pointer ${
              path === "/sign-up" || path === "/login"
                ? "text-white"
                : " text-slate-800"
            }`}
          >
            ثبت نام / ورود
          </span>
        </li>
      )}
    </>
  );
}
