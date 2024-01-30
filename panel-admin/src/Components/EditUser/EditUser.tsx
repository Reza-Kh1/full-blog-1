import { EditorUsertype } from "../../type";
import { fetchApi } from "../Fetch/FetchApi";
import InputFormUser from "../InputFormUser/InputFormUser";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
type EditorType = {
    setShow: (value: boolean) => void;
    show: boolean;
    infoUser?: EditorUsertype;
    dataUser: any;
};
export default function EditUserAdmin({
    setShow,
    show,
    infoUser,
    dataUser,
}: EditorType) {
    const action = async (form: FormData) => {
        const name = form.get("name");
        const phone = form.get("phone");
        const password = form.get("password");
        const email = form.get("email");
        const role = form.get("role");
        if (!name || !phone || !password || !email || !role) {
            toast.error("تمام فیلد هارو پر کنید");
            return;
        }
        const body = {
            name,
            phone,
            password,
            email,
            role,
        };
        const data = await fetchApi({ url: `/user/${infoUser?.id}`, method: "PUT", body: body })
        if (data.error) return
        toast.success("کاربر با موفقیت آپدیت شد");
        dataUser.forEach((i: any) => {
            if (i.id === infoUser?.id) {
                i.name = name;
                i.role = role;
                i.email = email;
            }
        });
        setShow(false);
    };
    return (
        <>
            {show && (
                <div className="fixed w-full h-full transform -translate-x-1/2 left-[50%] top-[50%] -translate-y-1/2 bg-[#1112127a] flex items-center justify-center">
                    <div className="w-4/6 p-4 bg-slate-600 rounded-md">
                        <div>
                            <i
                                className="py-1 px-3 bg-gray-100 rounded-md cursor-pointer"
                                onClick={() => setShow(false)}
                            >
                                <GrClose className="inline text-gray-800" />
                            </i>
                        </div>
                        <span className="flex justify-center items-center text-xl text-gray-300">
                            ویرایش کاربر
                        </span>
                        <InputFormUser action={action} userInfo={infoUser} />
                    </div>
                </div>
            )}
        </>
    );
}
