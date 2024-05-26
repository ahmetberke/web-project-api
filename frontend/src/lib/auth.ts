import { cookies } from "next/headers";

export const GetServerToken = () => {
  return cookies().get("token")?.value;
}