import LoadingBox from "@/components/loadingBox/page";
import HeaderAdmin from "@/components/navBarAdmin/page";
import SidebarAdmin from "@/components/sidebarAdmin/page";
import React, { Suspense } from "react";

export default function layoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex mt-2">
      <div className="w-2/12">
        <div className="top-14 p-2 rounded-md overflow-auto bg-gray-800 sticky shadow-lg min-h-screen">
          <SidebarAdmin />
        </div>
      </div>
      <div className="w-10/12">
        <div className="p-2 bg-gray-700 rounded-md mr-1 min-h-screen">
          <HeaderAdmin />
          <div className="mt-3">
            <Suspense fallback={<LoadingBox />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
