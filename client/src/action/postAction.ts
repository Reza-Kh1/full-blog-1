import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";

export type PostType = {
  succes: null | boolean;
  token: string | null;
  error: {
    message: null | string;
  };
};

export const postAction = async (prevData: PostType, form: FormData) => {
  if (!prevData?.token) return toast.warning("اول وارد حساب کاربری شوید");
  const content = form.get("content");
  const subject = form.get("subject");
  const title = form.get("title");
  const imgAlt = form.get("image-alt");
  const slug = form.get("slug");
  const keywords = form.get("keywords");
  const description = form.get("description");
  const subCategoryId = Number(form.get("category"));
  const status = form.get("status");
  const imgSrc = form.get("img-src");
  const id = form.get("id");
  const body = {
    content,
    subject,
    title,
    imgAlt,
    slug,
    keywords,
    description,
    subCategoryId,
    imgSrc,
    status: status ? true : false,
  };
  await fetch(`${process.env.NEXT_PUBLIC_URL}/post${id ? "/" + id : ""}`, {
    method: id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${prevData?.token}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((json) => Promise.reject(json));
      }
      return response.json();
    })
    .then(() => {
      toast.success("مقاله افزوده شد");
    })
    .catch((data) => {
      console.log(data);
      const error = data?.message.split(":")[1];
      toast.error(error);
    });

  return {
    token: prevData?.token,
  };
};
