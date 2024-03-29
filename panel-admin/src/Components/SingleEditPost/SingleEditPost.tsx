import { useEffect, useState } from "react";
import FormPost from "../FormPost/FormPost";
import { postPageType } from "../../type";
import { fetchApi } from "../Fetch/FetchApi";
import { useParams } from "react-router-dom";
export default function SingleEditPost() {
  const [edit, setEdit] = useState<postPageType | null>();
  const { slug } = useParams();
  const getData = async () => {
    const data = await fetchApi({ url: `/post/admin/${slug}`, method: "GET" });
    if (data.error) return;
    setEdit(data.json.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="w-full bg-slate-600 rounded-md p-2">
        <span>صفحه ویرایش اطلاعات</span>
        {edit && <FormPost edit={edit} />}
      </div>
    </>
  );
}
