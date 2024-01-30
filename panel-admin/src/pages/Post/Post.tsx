import { BsUpload } from "react-icons/bs";
import { Link } from "react-router-dom";
import FormPost from "../../Components/FormPost/FormPost";
export default function Page() {
  return (
    <div className="w-full">
      <div className="flex justify-between p-2 mb-5">
        <span className="text-gray-200 text-lg">
          مقاله جدید خودتان را بسازید
        </span>
        <Link to={"upload"} className="text-center">
          <span className="p-3 py-6 mb-2 justify-center flex border border-dashed rounded-md cursor-pointer">
            <i>
              <BsUpload className="text-[30px] text-gray-50" />
            </i>
          </span>
          <span className="text-xs text-slate-400 cursor-pointer">
            عکس خود را آپلود کنید
          </span>
        </Link>
      </div>
      <FormPost />
    </div>
  );
}
