import { GetServerToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AuthSLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const token = GetServerToken();
  if (token) redirect("/app/home");

  return <main className="flex h-[100vh]">
  <div className="flex-none w-full lg:w-[60%] h-full bg-teal-100 lg:bg-gray-50 flex justify-center items-center">
    <div className="bg-white w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/3 xl:w-1/2 shadow-sm rounded-lg p-12">
      <h1 className="text-teal-500 font-bold tracking-wider text-2xl">
        Okur Yazar
      </h1>
      {children}
    </div>
  </div>
  <div className="flex-1 h-full bg-teal-100"></div>
</main>;
}
