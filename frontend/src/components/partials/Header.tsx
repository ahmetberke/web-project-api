import React from 'react'
import { Logo } from './Logo'
import { Actions } from './Actions'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="w-full h-[60px] border-b flex bg-white">
      <Link href="/app/home" className="w-[200px]">
        <Logo />
      </Link>
      <div className="w-full">
      </div>
      <div className="w-auto">
        <Actions />  
      </div>      
    </header>
  )
}
