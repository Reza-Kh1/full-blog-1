import React from "react";
const getData = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/albums", {
    next: { revalidate: 500000 },
  });
  const gog = await res.json();
  return gog.data;
};
export default async function page() {
  const data: any = await getData();
  return (
    <div className="w-full">
      <div className="mt-5 max-w-7xl flex flex-wrap mx-auto p-2 rounded-md bg-slate-700 shadow-md">
        {data.map((i:any) => (
          <div key={i.id} className="w-3/12 p-2">
            <div className=" bg-blue-400 p-2 rounded-md shadow-lg flex flex-col">
              <span>{i.id}</span>
              <span>{i.userId}</span>
              <span>{i.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
