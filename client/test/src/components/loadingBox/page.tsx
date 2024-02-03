import React from "react";

export default function LoadingBox() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <span className="ml-3">صبر کنید ....</span>
      <span className="loader"></span>
    </div>
  );
}
