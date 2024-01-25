"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any>();
  const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/users`);
    const gog = await res.json();
    setData(gog.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full">
      <div className="mt-5 max-w-7xl flex flex-wrap mx-auto p-2 rounded-md bg-slate-700 shadow-md">
        {data &&
          data.map((i: any) => (
            <div key={i.id} className="w-3/12 p-2">
              <div className=" bg-slate-400 p-2 rounded-md shadow-lg flex flex-col">
                <span>اسم : {i.name}</span>
                <span>نام کاربرری : {i.username}</span>
                <span>ایمیل : {i.email}</span>
                <span>
                  شماره تلفن : <span>{i.phone}</span>
                </span>
                <span>زمان حال حاضر {new Date().toLocaleTimeString("fa")}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
