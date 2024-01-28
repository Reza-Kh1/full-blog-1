import React from "react";
import { IoIosMail } from "react-icons/io";
import "./style.css";
export default function NavBarAdmin() {
  return (
    <>
      <div className="w-full bg-gray-300 p-3 rounded-md">
        <div className="w-4/12 pt-3 flex mr-2">
          <div className="div-notif">
            <i>
              <IoIosMail className="text-2xl text-blue-500" />
            </i>
            <span className="span-notif flex items-center">
              <span>5</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
