"use client";
import { signOut } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Profile() {
  const { data }: any = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!data) router.replace("/");
  }, [true]);
  return (
    <>
      <div>profile</div>
      <span
        className="cursor-pointer "
        onClick={() =>
          signOut({ redirect: false })
            .then(() => {
              router.replace("/");
            })
            .catch(() => console.log("error"))
        }
      >
        Sign Out
      </span>
      <span className="block">{data?.user?.email}</span>
      <span className="block">{data?.user?.name}</span>
      <span className="block">{data?.user?.phone}</span>
      <span className="block">{data?.user?.role}</span>
    </>
  );
}
