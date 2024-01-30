import { useForm } from "react-hook-form";
import { FaRegWindowClose } from "react-icons/fa";
type EditCategoryType = {
  show: boolean;
  setShow: (vaule: boolean) => void;
  editCategory: (value: any) => void;
};
type EditType = {
  category: string;
};
export default function EditCategory({
  show,
  editCategory,
  setShow,
}: EditCategoryType) {
  const { register, handleSubmit, } = useForm<EditType>();
  const submit = (form: EditType) => {
    editCategory(form);
  };
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
            <form onSubmit={handleSubmit(submit)}>
              <input
                {...register("category", { required: true })}
                type="text"
                autoComplete="false"
                className="block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
              />
              <button
                type="submit"
                className="rounded-md bg-blue-400 py-1 px-4 mt-3"
              >
                ذخیره
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
