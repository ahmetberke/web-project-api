import { Header } from '@/components/partials/Header';
import { GetServerToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AuthSLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const token = GetServerToken();
  if (!token || token === "") redirect("/auth");

  return <>
    <main>
      {children}
    </main>
  </>;
}
