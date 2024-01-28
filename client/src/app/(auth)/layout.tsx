"use client";
import React from "react";
export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-4xl mt-10">
        <div className="mt-5">{children}</div>
      </div>
    </>
  );
}
