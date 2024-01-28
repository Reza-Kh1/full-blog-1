"use client";
import React, { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import EditUserAdmin from "./editUser";
import InputFormUser from "@/components/inputFormUser/page";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { EditorUsertype, UserAdminType } from "@/app/type";
export default function Page() {
  const { data }: any = useSession();
  const [editUser, setEditUser] = useState<EditorUsertype>();
  const [user, setUser] = useState<UserAdminType>();
  const actions = async (form: FormData) => {
    const name = form.get("name");
    const phone = form.get("phone");
    const password = form.get("password");
    const email = form.get("email");
    const role = form.get("role");
    const body = {
      name,
      phone,
      password,
      email,
      role,
    };
    console.log(body);

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.user?.token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      toast.error("کاربر آپدیت نشد");
      return;
    }
    toast.success("کاربر با موفقیت آپدیت شد");
    getUser();
  };
  const getUser = async (id?: number | null | undefined) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/user${id ? "?page=" + id : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.user?.token}`,
        },
      }
    );
    if (!res.ok) {
      toast.error("اتصال با دیتابیس برقرار نشد");
      return;
    }
    const gog = await res.json();
    if (id && user?.rows) {
      setUser({
        ...user,
        pagination: gog.data.pagination,
        rows: [...user.rows, ...gog.data.rows],
      } as UserAdminType);
      return;
    }
    setUser(gog.data);
  };
  const deleteUser = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.user?.token}`,
      },
    });
    if (!res.ok) {
      toast.error("اتصال با دیتابیس برقرار نشد");
      return;
    }
    toast.success("کاربر با موفقیت حذف شد");
    const gog = user?.rows.filter((i) => {
      return i.id !== id;
    });
    if (user?.count) {
      setUser({ ...user, rows: gog, count: user?.count - 1 } as UserAdminType);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <div className="w-full">
        <div className="bg-slate-600 p-2 rounded-md w-full">
          <span className="text-gray-300">افزودن کاربر جدید</span>
          <InputFormUser action={actions} />
        </div>
        <div className="bg-slate-600 p-2 rounded-md mt-3 w-full">
          <div className="flex justify-between">
            <span onClick={() => setShow(true)} className="text-gray-300">
              اخرین کاربرانی که ثبت نام کرده اند
            </span>
            <span className="text-gray-300">
              {user?.count ? user.count + "کاربر" : ""}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-right text-sm font-light">
                    <thead className="border-b bg-gray-500 font-medium">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          تعداد
                        </th>
                        <th scope="col" className="px-6 py-4">
                          نام
                        </th>
                        <th scope="col" className="px-6 py-4">
                          شماره تلفن
                        </th>
                        <th scope="col" className="px-6 py-4">
                          ایمیل
                        </th>
                        <th scope="col" className="px-6 py-4">
                          سطح کاربری
                        </th>
                        <th scope="col" className="px-6 py-4">
                          عملیات
                        </th>
                        <th scope="col" className="px-6 py-4">
                          تاریخ عضویت
                        </th>
                        <th scope="col" className="px-6 py-4">
                          تاریخ ویرایش
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-b bg-blue-200 text-center">
                      {user?.rows &&
                        user?.rows.map((i, index) => (
                          <tr key={index} className="border-b bg-blue-200">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {i?.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {i?.phone}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {i?.email}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {i?.role}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex justify-evenly">
                                <i onClick={() => deleteUser(i.id)}>
                                  <FaTrash className="inline ml-3 text-red-500 cursor-pointer" />
                                </i>
                                <i
                                  onClick={() => {
                                    setShow(true),
                                      setEditUser({
                                        email: i.email,
                                        name: i.name,
                                        phone: i.phone,
                                        role: i.role,
                                        id: i.id,
                                      });
                                  }}
                                >
                                  <FaPen className="inline text-blue-600 cursor-pointer" />
                                </i>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {new Date(i?.createdAt).toLocaleDateString("fa")}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {new Date(i?.updatedAt).toLocaleDateString("fa")}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {user?.pagination?.nextPage && (
            <button onClick={() => getUser(user?.pagination?.nextPage)}>
              نمایش بیشتر
            </button>
          )}
        </div>
        <EditUserAdmin
          setShow={setShow}
          show={show}
          infoUser={editUser}
          dataUser={user?.rows}
        />
      </div>
    </>
  );
}
