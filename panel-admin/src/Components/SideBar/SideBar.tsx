import { NavLink } from "react-router-dom";
export default function SidebarAdmin() {
    return (
        <>
            <div className="flex flex-col gap-2 sideBar-admin">
                <NavLink to={"dashboard"} className={"px-3 py-1 shadow-md transition-all relative bg-slate-400 rounded-md text-gray-200"}>داشبورد</NavLink>
                <NavLink to={"post"} className={"px-3 py-1 shadow-md transition-all relative bg-slate-400 rounded-md text-gray-200"}>ساخت مقاله</NavLink>
                <NavLink to={"all-post"} className={"px-3 py-1 shadow-md transition-all relative bg-slate-400 rounded-md text-gray-200"}>نمایش مقاله ها</NavLink>
                <NavLink to={"user"} className={"px-3 py-1 shadow-md transition-all relative bg-slate-400 rounded-md text-gray-200"}>کاربران</NavLink>
                <NavLink to={"review"} className={"px-3 py-1 shadow-md transition-all relative bg-slate-400 rounded-md text-gray-200"}>کامنت ها</NavLink>
                <NavLink to={"category"} className={"px-3 py-1 shadow-md transition-all relative bg-slate-400 rounded-md text-gray-200"}>دسته بندی</NavLink>
                <NavLink to={"upload"} className={"px-3 py-1 shadow-md transition-all relative bg-slate-400 rounded-md text-gray-200"}>آپلود عکس</NavLink>
                <span className="cursor-pointer">
                    خروج
                </span>
            </div>
        </>
    );
}
