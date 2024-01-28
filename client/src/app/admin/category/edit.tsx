import InputLabel from "@/components/inputLabel/page";
import SubmitButton from "@/components/submitButton/page";
import React from "react";
import { FaRegWindowClose } from "react-icons/fa";
type EditCategoryType = {
  show: boolean;
  setShow: (vaule: boolean) => void;
  editCategory: (value: any) => void;
};
export default function EditCategory({
  show,
  editCategory,
  setShow,
}: EditCategoryType) {
  return (
    <div>
      {show && (
        <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#000000ad] flex items-center justify-center">
          <div className="w-3/12 h-auto p-2 rounded-lg shadow-lg bg-slate-400 flex gap-2 flex-col">
            <div>
              <i onClick={() => setShow(false)}>
                <FaRegWindowClose className="text-2xl cursor-pointer inline" />
              </i>
            </div>
            <form action={editCategory}>
              <InputLabel name="category" type="text" required />
              <SubmitButton
                types="submit"
                value="ذخیره"
                classs="rounded-md bg-blue-400 py-1 px-4 mt-3"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
