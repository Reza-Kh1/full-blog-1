import { useState } from "react";
import BtnLogin from "./BtnLogin";
import { useForm } from "react-hook-form";
import { FetcApi } from "../../Components/Fetch/FetchApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type FormType = {
  phone: string;
  password: string;
};
type signUpType = {
  phone: string;
  password: string;
  name: string;
  passreply: string;
  email: string;
};
export default function Auth() {
  const [isLogin, setIsLogin] = useState<"signUp" | "login">("login");
  const navigate = useNavigate();
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm<signUpType>();
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm<FormType>();

  const onSignUp = async (data: signUpType) => {
    console.log(data);
  };

  const onLogin = async (data: FormType) => {
    const datas = await FetcApi({
      url: "/user/login",
      method: "POST",
      body: data,
    });
    localStorage.setItem("token", datas.infoUser.token);
    console.log("وارد شدین");
    toast.success("وارد شدین")
    navigate("/dashboard");
  };
  return (
    <>
      <div className="w-7/12 mx-auto mt-3">
        <BtnLogin value={isLogin} set={setIsLogin} />
        <div className="w-full max-w-7xl flex justify-between relative mb-5">
          <div
            className={`bg-slate-300 transition-all transform p-3  w-[100%] py-6 text-center rounded-md absolute top-[0%] h-auto left-0 ${
              isLogin === "login" ? "z-10" : "z-0 opacity-0"
            }`}
          >
            <h3 className="mb-5 text-lg">ورود به نکس بلاگ</h3>
            <form onSubmit={handleSubmitLogin(onLogin)}>
              <input
                type="text"
                {...registerLogin("phone", { required: true, minLength: 11 })}
                placeholder="شماره تلفن"
                className="p-2 text-base block rounded-md mx-auto shadow-md  w-4/12"
              />
              {errorsLogin.phone && (
                <p>شماره تلفن باید 11 رقم باشه مثل : 09121231212</p>
              )}
              <input
                type="password"
                placeholder="رمز عبور"
                {...registerLogin("password", { required: true })}
                className=" text-base p-2 block rounded-md mx-auto my-6 shadow-md  w-4/12"
                required
              />
              <button
                type="submit"
                className="w-4/12 bg-slate-400 hover:bg-slate-600 hover:text-white shadow-md transition-all p-2 rounded-md"
              >
                وارد شوید
              </button>
            </form>
          </div>
          <div
            className={`bg-slate-300 transition-all transform w-[100%] p-3 py-6 text-center rounded-md absolute top-[0%] h-auto right-0 ${
              isLogin === "signUp" ? "z-10" : "z-0 opacity-0"
            }`}
          >
            <h3 className="mb-5 text-lg">ثبت نام در نکس بلاگ</h3>
            <form onSubmit={handleSubmitSignUp(onSignUp)}>
              <input
                {...registerSignUp("name", { required: true })}
                type="text"
                placeholder="نام"
                className="p-2 text-base block rounded-md my-6  mx-auto shadow-md  w-4/12"
                required
              />
              <input
                type="text"
                {...registerSignUp("phone", { required: true, minLength: 11 })}
                name="phone"
                placeholder="شماره تلفن"
                className="p-2 text-base block rounded-md mx-auto shadow-md  w-4/12"
              />
              {errorsSignUp.phone && (
                <p>شماره تلفن باید 11 رقم باشه مثل : 09121231212</p>
              )}
              <input
                type="email"
                {...registerSignUp("email", { required: true })}
                placeholder="ایمیل (اختیاری)"
                className="p-2 text-base block rounded-md mx-auto my-6 shadow-md  w-4/12"
              />
              <input
                type="password"
                {...registerSignUp("password", { required: true })}
                placeholder="رمز عبور"
                className=" text-base p-2 block rounded-md mx-auto shadow-md  w-4/12"
                required
              />
              <input
                type="password"
                {...registerSignUp("passreply", { required: true })}
                placeholder="تکرار رمز عبور"
                required
                className=" text-base p-2 block rounded-md mx-auto my-6 shadow-md  w-4/12"
              />
              <button
                type="submit"
                className="w-4/12 bg-slate-400 hover:bg-slate-600 hover:text-white shadow-md transition-all p-2 rounded-md"
              >
                ثبت نام کنید
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
