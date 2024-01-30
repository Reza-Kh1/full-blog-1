import { useEffect, useState } from "react";
import GetImage from "../GetImage/GetImage";
import { BsCardImage } from "react-icons/bs";
import { fetchApi } from "../Fetch/FetchApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
type CategoryType = {
  id: number;
  name: string;
};
// type FormPostType = {
//   edit?: postPageType;
// };
export default function FormPost({ edit }: any) {
  const [imagePost, setImagePost] = useState<string | null>(
    edit?.imgSrc ? edit.imgSrc : null
  );
  const [checkbox, setCheckBox] = useState<boolean>(
    edit?.status ? edit.status : false
  );
  const [showImage, setShowImage] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryType[]>();
  const { register, handleSubmit } = useForm<any>();
  const getCategory = async () => {
    const data = await fetchApi({ url: "/sub-category/all", method: "GET" });
    setCategory(data.json.data);
  };
  const submitBtn = async (form: any) => {
    const body = {
      subject: form.subject,
      imgSrc: imagePost,
      imgAlt: form.imageAlt,
      content: form.content,
      title: form.title,
      slug: form.slug,
      description: form.description,
      keywords: form.keywords,
      subCategoryId: form.category,
      status: checkbox,
    };
    if (form.edit) {
      const data = await fetchApi({
        url: `/post/${form.edit}`,
        method: "PUT",
        body,
      });
      if (data.error) return;
    } else {
      const data = await fetchApi({ url: "/post", method: "POST", body });
      if (data.error) return;
    }
    toast.success("عملیات ثبت شد");
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <form className="flex flex-wrap" onSubmit={handleSubmit(submitBtn)}>
        <input
          type="text"
          {...register("edit")}
          name="edit"
          hidden
          defaultValue={edit?.id}
        />
        <div className="w-6/12 p-2">
          <label className={"text-gray-200"}>موضوع مقاله :</label>
          <input
            {...register("subject", { required: true })}
            defaultValue={edit?.subject ? edit?.subject : ""}
            autoComplete={"off"}
            type={"text"}
            className={
              "block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
            }
          />
        </div>
        <div className="w-3/12 p-2">
          <label className={"text-gray-200"}>عنوان مقاله (سربرگ) :</label>
          <input
            {...register("title", { required: true })}
            defaultValue={edit?.title ? edit?.title : ""}
            autoComplete={"off"}
            type={"text"}
            className={
              "block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
            }
          />
        </div>
        <div className="w-3/12 p-2">
          <label className={"text-gray-200"}>عنوان تصویر :</label>
          <input
            defaultValue={edit?.imgAlt ? edit?.imgAlt : ""}
            autoComplete={"off"}
            {...register("imageAlt", { required: true })}
            type={"text"}
            className={
              "block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
            }
          />
        </div>
        <div className="w-3/6 p-2">
          <label className={"text-gray-200"}>اسلاگ :</label>
          <input
            defaultValue={edit?.slug ? edit?.slug : ""}
            autoComplete={"off"}
            {...register("slug", { required: true })}
            type={"text"}
            className={
              "block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
            }
          />
        </div>
        <div className="w-3/6 p-2">
          <label className={"text-gray-200"}>کلمات کلیدی :</label>
          <input
            defaultValue={edit?.keywords ? edit?.keywords : ""}
            autoComplete={"off"}
            {...register("keywords", { required: true })}
            type={"text"}
            className={
              "block p-2 rounded-md shadow-md bg-slate-200 mt-2 focus:shadow-blue-300 text-gray-800 w-full"
            }
          />
        </div>
        <div className="w-3/6 p-2">
          <label className="text-gray-200">توضیحات مربوطه :</label>
          <textarea
            style={{ resize: "none" }}
            {...register("description", { required: true })}
            rows={5}
            name="description"
            defaultValue={edit?.description ? edit.description : undefined}
            className="block p-2 rounded-md shadow-md bg-slate-200 focus:shadow-gray-500 text-gray-800 w-full mt-2"
          ></textarea>
        </div>
        <div className="w-1/6 flex items-center justify-center flex-col">
          <label htmlFor="open" className="text-gray-300">
            دسته پست را انتخاب کنید
          </label>
          {category && (
            <select
              {...register("category", { required: true })}
              id="open"
              defaultValue={
                edit?.subCategoryId ? Number(edit.subCategoryId) : undefined
              }
              className="bg-gray-50 border mt-2 cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={"default"}>انتخاب کنید</option>
              {category.map((i) => (
                <option value={Number(i.id)} key={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="w-2/6 p-2 text-center">
          <span className="text-gray-200 mb-2 block">
            عکس اصلی مقاله را انتخاب کنید
          </span>
          <label
            onClick={() => setShowImage(true)}
            htmlFor="image"
            className="mb-2 justify-center flex border border-dashed rounded-md w-6/12 mx-auto cursor-pointer"
          >
            {imagePost ? (
              <img
                alt=""
                width={200}
                height={200}
                src={imagePost}
                className="h-full w-full object-cover rounded-md"
              />
            ) : (
              <i className="px-6 py-10">
                <BsCardImage className="text-[30px] text-gray-50" />
              </i>
            )}
            <input
              type="text"
              hidden
              id="image"
              name="img-src"
              onChange={() => {}}
              value={imagePost ? imagePost : undefined}
              defaultValue={imagePost ? imagePost : ""}
            />
          </label>
          <label className="text-xs text-slate-400 cursor-pointer">
            عکس خود را انتخاب کنید
          </label>
        </div>
        <div className="w-full p-2">
          <label htmlFor="content">متن خود را وارد کنید</label>
          <textarea
            rows={6}
            cols={100}
            {...register("content", { required: true })}
            defaultValue={edit?.content ? edit.content : undefined}
            className="block p-2 rounded-md shadow-md bg-slate-200 focus:shadow-gray-500 text-gray-800 w-full mt-2"
          ></textarea>
        </div>
        <div className="w-full p-2 flex justify-between">
          <button
            type="submit"
            className="shadow-md bg-blue-400 rounded-lg py-2 px-7 hover:shadow-blue-700"
          >
            ذخیره
          </button>
          <div>
            <label
              htmlFor="status"
              className="ml-2 text-gray-300 cursor-pointer"
            >
              منتشر شود ؟
            </label>
            <input
              onChange={() => setCheckBox((prev) => !prev)}
              type="checkbox"
              name="status"
              id="status"
              checked={checkbox}
            />
          </div>
        </div>
      </form>
      <div className="image">
        <GetImage
          setImage={setShowImage}
          showImage={showImage}
          setImg={setImagePost}
        />
      </div>
    </>
  );
}
