import Image from "next/image";
import logo from "../../../public/logo.jpg";
import GetCategory from "./getCategory";
import SearchBox from "./search";
const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/category`, {
    method: "GET",
    headers: {
      ContentType: "application/json",
    },
    next: { revalidate: 864000 },
  });
  return await res.json();
};
export default async function Header() {
  const data = await getData();
  return (
    <>
      <nav className="max-w-7xl mx-auto menu-site sticky top-0 mt-4 z-50">
        <div className="flex items-center justify-between w-full bg-slate-600 rounded-lg">
          <div className="menu w-8/12">
            <ul className="flex mr-1 justify-evenly">
              {data && <GetCategory category={data.data.rows} />}
            </ul>
          </div>
          <div className="search w-2/12">
            <div className="relative w-full">
              <SearchBox />
            </div>
          </div>
          <div className="logo ml-1 w-1/12">
            <figure className="w-full flex justify-end">
              <Image
                src={logo}
                alt="logo site blog next js"
                width={50}
                height={50}
                className="bg-slate-600"
              />
            </figure>
          </div>
        </div>
      </nav>
    </>
  );
}
