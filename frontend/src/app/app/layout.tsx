import { Header } from "@/components/partials/Header";
import { GetServerToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const token  = GetServerToken();
  if (!token) redirect("/auth/login");

  return <main>
    <Header />
    {children}
  </main>;
}
