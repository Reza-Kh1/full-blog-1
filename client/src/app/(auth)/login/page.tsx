"use client";
import { signIn } from "next-auth/react";
import SubmitButton from "@/components/submitButton/page";
import { useState } from "react";
import BtnLogin from "../btnLogin";
export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<"signUp" | "login">("login");
  const onSubmit = async (e: FormData) => {
    const passwordReply = e.get("password-reply");
    const password = e.get("password");
    if (passwordReply && passwordReply !== password) {
      setError("پسورد اشتباه وارد شده است");
      return;
    }
    const name = e.get("name");
    const email = e.get("email");
    const phone = e.get("phone");
    await signIn("credentials", {
      name,
      email,
      password,
      phone,
      login: passwordReply ? false : true,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <>
      <BtnLogin value={isLogin} set={setIsLogin} />
      <div className="w-full max-w-7xl flex justify-between relative mb-5">
        <div
          className={`bg-slate-300 transition-all transform p-3  w-[100%] py-6 text-center rounded-md absolute top-[0%] h-auto left-0 ${
            isLogin === "login" ? "z-10" : "z-0 opacity-0"
          }`}
        >
          <h3 className="mb-5 text-lg">ورود به نکس بلاگ</h3>
          {error && (
            <span className="block my-3 bg-red-300 rounded-lg p-2">
              {error}
            </span>
          )}
          <form action={onSubmit} className="text-center">
            <input
              type="text"
              name="phone"
              placeholder="شماره تلفن"
              className="p-2 text-base block rounded-md mx-auto shadow-md  w-4/12"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="رمز عبور"
              className=" text-base p-2 block rounded-md mx-auto my-6 shadow-md  w-4/12"
              required
            />
            <SubmitButton
              value="وارد شوید"
              classs="w-4/12 bg-slate-400 hover:bg-slate-600 hover:text-white shadow-md transition-all p-2 rounded-md"
              types="submit"
            />
          </form>
        </div>
        <div
          className={`bg-slate-300 transition-all transform w-[100%] p-3 py-6 text-center rounded-md absolute top-[0%] h-auto right-0 ${
            isLogin === "signUp" ? "z-10" : "z-0 opacity-0"
          }`}
        >
          <h3 className="mb-5 text-lg">ثبت نام در نکس بلاگ</h3>
          {error && (
            <span className="block my-3 bg-red-300 rounded-lg p-2">
              {error}
            </span>
          )}
          <form action={onSubmit} className="text-center">
            <input
              type="text"
              name="name"
              placeholder="نام"
              className="p-2 text-base block rounded-md my-6  mx-auto shadow-md  w-4/12"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="شماره تلفن"
              className="p-2 text-base block rounded-md mx-auto shadow-md  w-4/12"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="ایمیل (اختیاری)"
              className="p-2 text-base block rounded-md mx-auto my-6 shadow-md  w-4/12"
            />
            <input
              type="password"
              name="password"
              placeholder="رمز عبور"
              className=" text-base p-2 block rounded-md mx-auto shadow-md  w-4/12"
              required
            />
            <input
              type="password"
              name="password-reply"
              placeholder="تکرار رمز عبور"
              required
              className=" text-base p-2 block rounded-md mx-auto my-6 shadow-md  w-4/12"
            />
            <SubmitButton
              value="ثبت نام کنید"
              classs="w-4/12 bg-slate-400 hover:bg-slate-600 hover:text-white shadow-md transition-all p-2 rounded-md"
              types="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}
