import InputLabel from "../InputLabel/InputLabel";
import { EditorUsertype } from "../../type";
type InputFormUser = {
    action: (value: FormData) => void;
    userInfo?: EditorUsertype;
};
export default function InputFormUser({ action, userInfo }: InputFormUser) {
    return (
        <div>
            <form className="w-full flex flex-wrap" action={action}>
                <div className="w-6/12 p-2">
                    <InputLabel
                        required
                        type="text"
                        name="name"
                        label="نام کاربر"
                        complete="false"
                        value={userInfo?.name}
                    />
                </div>
                <div className="w-6/12 p-2">
                    <InputLabel
                        required
                        type="text"
                        name="phone"
                        label="شماره تلفن"
                        complete="false"
                        value={userInfo?.phone}
                    />
                </div>
                <div className="w-6/12 p-2">
                    <InputLabel
                        required
                        type="text"
                        name="password"
                        label="پسورد"
                        complete="false"
                    />
                </div>
                <div className="w-6/12 p-2">
                    <InputLabel
                        type="text"
                        required
                        name="email"
                        label="ایمیل"
                        complete="false"
                        value={userInfo?.email}
                    />
                </div>
                <div className="w-full mt-4 flex justify-between">
                    <button type="submit" className="bg-blue-300 rounded-md py-1 px-4">
                        ذخیره کردن
                    </button>
                    <select
                        required
                        name="role" aria-label="d" aria-hidden="true"
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
