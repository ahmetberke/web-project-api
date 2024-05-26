import { GetServerToken } from "@/lib/auth";
import axios from "axios";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {

  return redirect("/app/home");
}
