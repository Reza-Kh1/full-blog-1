"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [token, setToken] = useState<string | null>()
  useEffect(() => {
    const get = localStorage.getItem("user-info") || null
    setToken(get)
    console.log(get);
  }, [])
  return (
    <>
      {category.map((i) => (
        <li key={i.id}>
          <Link
            href={"/category/" + i.name}
            className={`transition-all ${path === `/category/${i.name}` ? "text-white" : " text-slate-800"
              }`}
          >
            {i.name}
          </Link>
        </li>
      ))}
      {console.log(token)
      }
      <li>
        <Link
          href={"/post"}
          className={`transition-all ${path === "/post" ? "text-white" : " text-slate-800"
            }`}
        >
          بلاگ
        </Link>
      </li>
      {token ? (
        <li>
          <Link
            href={"/profile"}
            className={`transition-all ${path === "/profile" ? "text-white" : " text-slate-800"
              }`}
          >
            پروفایل
          </Link>
        </li>
      ) : (
        <li>
          <Link
            href={"/login"}
            className={`transition-all cursor-pointer ${path === "/sign-up" || path === "/login"
              ? "text-white"
              : " text-slate-800"
              }`}
          >
            ثبت نام / ورود
          </Link>
        </li>
      )}
    </>
  );
}
