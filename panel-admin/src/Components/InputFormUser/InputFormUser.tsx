import { EditorUsertype } from "../../type";
import { useForm } from "react-hook-form";
type InputFormUser = {
  action: (value: InputuserType) => void;
  userInfo?: EditorUsertype;
};
export type InputuserType = {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
};
export default function InputFormUser({ action, userInfo }: InputFormUser) {
  const { register, handleSubmit, reset } = useForm<InputuserType>();
  const submirAction = (form: InputuserType) => {
    action(form);
    reset();
  };
  return (
    <div>
      <form
        className="w-full flex flex-wrap"
        onSubmit={handleSubmit(submirAction)}
      >
        <div className="w-6/12 p-2">
          <label className={"text-gray-200"}>نام کاربر</label>
          <input
            autoComplete="false"
            type="text"
            {...register("name", { required: true })}
            className="block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
          />
        </div>
        <div className="w-6/12 p-2">
          <label className={"text-gray-200"}>شماره تلفن</label>
          <input
            autoComplete="false"
            type="text"
            {...register("phone", { required: true })}
            className="block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
          />
        </div>
        <div className="w-6/12 p-2">
          <label className={"text-gray-200"}>پسورد</label>
          <input
            autoComplete="false"
            type="text"
            {...register("password", { required: true })}
            className="block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
          />
        </div>
        <div className="w-6/12 p-2">
          <label className={"text-gray-200"}>ایمیل</label>
          <input
            autoComplete="false"
            type="text"
            {...register("email", { required: true })}
            className="block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
          />
        </div>
        <div className="w-full mt-4 flex justify-between">
          <button type="submit" className="bg-blue-300 rounded-md py-1 px-4">
            ذخیره کردن
          </button>
          <select
            required
            {...register("role", { required: true })}
            aria-label="d"
            aria-hidden="true"
            defaultValue={userInfo?.role}
            className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/12 p-2.5"
          >
            <option value={"USER"}>کاربر ساده</option>
            <option value={"AUTHOR"}>نویسنده</option>
            <option value={"ADMIN"}>ادمین</option>
          </select>
        </div>
      </form>
    </div>
  );
}
