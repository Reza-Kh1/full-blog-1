import React from "react";
const getData = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_URL + "/todos");
  const data = await response.json();
  return data;
};
export default async function Page() {
  const { data } = await getData();
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
    </div>
  );
}
