"use client";
import React, { useState } from "react";

export default function BtnLogin({
  value,
  set,
}: {
  value: "signUp" | "login";
  set: any;
}) {
  return (
    <>
      <div className="mx-auto mb-5 w-full flex text-center justify-between p-3 bg-slate-300 rounded-lg">
        <span
          onClick={() => set("signUp")}
          className={`cursor-pointer transition-all py-2 px-5 text-sm w-5/12 block rounded-lg ${
            value === "signUp"
              ? "bg-purple-700 shadow-md text-white"
              : "bg-purple-400"
          }`}
        >
          ثبت نام
        </span>
        <span
          onClick={() => set("login")}
          className={`cursor-pointer transition-all py-2 px-5 text-sm w-5/12 block bg-purple-400 rounded-lg ${
            value === "login"
              ? "bg-purple-700 shadow-md text-white"
              : "bg-purple-400 "
          }`}
        >
          ورود
        </span>
      </div>
    </>
  );
}
