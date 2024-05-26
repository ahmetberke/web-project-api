import React from 'react'
import { LoginForm } from './LoginForm'
import Link from 'next/link'

export default function Login() {

  return (
    <div className="py-6">
      <LoginForm />
      
      <div className="w-full text-center">
        <Link href="/auth/register" className="text-xs text-gray-600 hover:text-gray-950 hover:underline" >
          Üye Değil misin? Hemen Kaydol
        </Link>
      </div>

    </div>
  )
}
