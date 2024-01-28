"use server";
import { revalidatePath } from "next/cache";
export type prevData = {
  successful: undefined | string;
  errors: { message: undefined | string };
  userInfo: any;
};
export const loginUser = async (prevData: prevData, form: FormData) => {
  const name = form.get("name");
  const phone = form.get("phone");
  const email = form.get("email");
  const password = form.get("password");
  const passwordReply = form.get("passwordReply");
  if (password !== passwordReply) {
    return {
      errors: {
        message: "پسورد اشتباه وارد شده",
      },
    };
  }
  const body = {
    name,
    phone,
    email,
    password,
  };
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await data.json();
    if (!data.ok) {
      throw new Error(response.message);
    }
    revalidatePath("/sign-up");
    return {
      userInfo: response,
      successful: "به سایت ما خوش آمدید ❤️",
    };
  } catch (err: any) {
    revalidatePath("/sign-up");
    return {
      errors: {
        message: err.message.includes(":")
          ? err.message.split(":")[1]
          : err.message,
      },
    };
  }
};
