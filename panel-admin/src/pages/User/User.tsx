import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import EditUserAdmin from "../../Components/EditUser/EditUser";
import InputFormUser, {
  InputuserType,
} from "../../Components/InputFormUser/InputFormUser";
import { toast } from "react-toastify";
import { EditorUsertype, UserAdminType } from "../../type";
import { fetchApi } from "../../Components/Fetch/FetchApi";
export default function Page() {
  const [editUser, setEditUser] = useState<EditorUsertype>();
  const [user, setUser] = useState<UserAdminType>();
  const actions = async (form: InputuserType) => {
    const body = {
      name: form.name,
      phone: form.phone,
      password: form.password,
      email: form.email,
      role: form.role,
    };
    const data = await fetchApi({ url: "/user", method: "POST", body: body });
    if (data.error) return;
    toast.success("کاربر با موفقیت آپدیت شد");
    getUser();
  };
  const getUser = async (id?: number | null | undefined) => {
    const data = await fetchApi({
      url: `/user${id ? "?page=" + id : ""}`,
      method: "GET",
    });
    if (data.error) return;
    if (id && user?.rows) {
      setUser({
        ...user,
        pagination: data.json.data.pagination,
        rows: [...user.rows, ...data.json.data.rows],
      } as UserAdminType);
      return;
    }
    setUser(data.json.data);
  };
  const deleteUser = async (id: number) => {
    const data = await fetchApi({ url: `/user/${id}`, method: "DELETE" });
    if (data.error) return;
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
