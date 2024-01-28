"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
export default function SearchBox() {
  const router = useRouter();
  const actionSearch = (form: FormData) => {
    const search = form.get("search");
    if (!search) return;
    router.replace(`/search/${search}`);
  };
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={(form: FormData) => {
        actionSearch(form), ref.current?.reset();
      }}
    >
      <input
        required
        type="text"
        className="p-2 rounded-md shadow-md text-sm w-full"
        placeholder="جستجو کنید..."
        name="search"
      />
      <button type="submit" aria-label="d" aria-hidden="true">
        <i className="absolute top-[50%] bg-white py-2 left-0 transform translate-x-1/2 -translate-y-1/2">
          <FaSearch />
        </i>
      </button>
    </form>
  );
}
