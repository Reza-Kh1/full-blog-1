type FetcApiType = {
  method: "POST" | "PUT" | "GET" | "DELETE";
  url: string;
  body?: any;
};
export const FetcApi = async ({ url, method, body }: FetcApiType) => {
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
    return { message: json.message || "error" };
  }
  return json;
};
