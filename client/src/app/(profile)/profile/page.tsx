"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Profile() {
  const [user, serUser] = useState<string | null>()
  const router = useRouter();
  const signOut = () => {
    localStorage.setItem("user-info", "")
    router.replace("/");
  }
  useEffect(() => {
    const gog = localStorage.getItem("user-info")
    // if (!gog) {
    //   router.replace("/");
    // }
    serUser(gog)
    console.log(gog);
  }, []);
  return (
    <>
      <div>profile</div>
      <span
        className="cursor-pointer "
        onClick={signOut}
      >
        Sign Out
      </span>
      {/* <span className="block">{data?.user?.email}</span>
      <span className="block">{data?.user?.name}</span>
      <span className="block">{data?.user?.phone}</span>
      <span className="block">{data?.user?.role}</span> */}
    </>
  );
}
