"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
export default function NotFound() {
  const params = usePathname();
  return (
    <>
      <div className="mx-auto text-center mt-10">
        <h3 className="text-xl">
          صفحه مورد نظر <span className="text-blue-400">{params}</span> یافت
          نشد.
        </h3>
        <div className="mt-10 text-gray-800 flex flex-col ">
          <span>بازگشت به صفحه اصلی </span>
          <span className="mt-3">
            <Link
              href={"/"}
              className="text-blue-600 text-2xl"
            >
              کلیک کنید
              <FaHome className="inline mr-1 text-xl" />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
