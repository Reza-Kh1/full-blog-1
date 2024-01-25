"use client";
import React, { useRef, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any>([]);
  const ref = useRef<HTMLFormElement>(null);
  const action = async (event: any) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name");
    const text = form.get("text");
    const body = {
      name,
      text,
    };
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      setData(null);
      return;
    }
    const json = await res.json();
    if (data) {
      setData([...data, { ...json.data }]);
    } else {
      setData([json.data]);
    }

    if (ref.current) {
      ref.current.reset();
    }
  };
  return (
    <div className="mt-5 max-w-7xl mx-auto">
      <div className="bg-slate-700 rounded-md p-3 flex flex-wrap gap-3">
        {data &&
          data.map((i: any, index: any) => (
            <div className="w-3/12 p-2" key={index}>
              <div className="bg-blue-400 shadow-lg rounded-md p-2 flex flex-col justify-center gap-3">
                <span>{i.name}</span>
                <span>{i.text}</span>
              </div>
            </div>
          ))}
      </div>
      <form
        ref={ref}
        onSubmit={action}
        className="bg-slate-700 rounded-md p-3 flex flex-col gap-3 mt-3 justify-center items-center"
      >
        <input
          type="text"
          name="name"
          autoComplete="false"
          required
          className="p-1 w-3/12 rounded-sm text-gray-900 bg-slate-300"
        />
        <input
          type="text"
          autoComplete="false"
          name="text"
          required
          className="p-1 w-3/12 rounded-sm text-gray-900 bg-slate-300"
        />
        <button
          type="submit"
          className="py-1 px-3 w-3/12  rounded-md bg-slate-400"
        >
          ارسال
        </button>
      </form>
    </div>
  );
}
