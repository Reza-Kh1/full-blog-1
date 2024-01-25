import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="max-w-7xl mx-auto mt-3">
      <div className="flex flex-col">
        <h3>first image</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste
          eos distinctio magnam quae. In obcaecati aliquam est vitae, quibusdam
          aspernatur veniam fugiat sequi voluptates natus libero quia? Commodi,
          aliquid!
        </p>
        <figure className="mt-3 bg-slate-400 p-2 rounded-md w-1/2 mx-auto">
          <Image
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUMHQW6VvWB6Hn845x5MamZsrv4UXZPtojKoPHGEClgQ&s"
            }
            width={400}
            height={400}
            alt="alt image"
            className="w-full"
          />
        </figure>
      </div>
    </div>
  );
}
