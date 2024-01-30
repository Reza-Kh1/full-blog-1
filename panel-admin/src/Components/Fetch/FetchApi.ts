import { toast } from "react-toastify";

type FetcApiType = {
  method: "POST" | "PUT" | "GET" | "DELETE";
  url: string;
  body?: any;
};
type ResponseApi = {
  error?: string
  json?: any
}
export const fetchApi = async ({ url, method, body }: FetcApiType): Promise<ResponseApi> => {
  const res = await fetch(import.meta.env.VITE_PUBLIC_URL_API + url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) {
    toast.error(json.message || "خطایی پیش آمد لطفا دوباره تلاش کنید!")
    return { error: json.message || "error" };
  }
  return { json };
};
