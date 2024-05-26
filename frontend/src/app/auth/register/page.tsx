import React from 'react'
import { RegisterForm } from './RegisterForm'
import Link from 'next/link'

export default function Register() {

  return (
    <div className="py-6">
      <RegisterForm />
      <div className="w-full text-center">
        <Link href="/auth/login" className="text-xs text-gray-600 hover:text-gray-950 hover:underline" >
          Zaten üye misin? Hadi giriş yap
        </Link>
      </div>
    </div>
  )
}
