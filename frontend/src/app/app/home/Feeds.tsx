"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import cn from "classnames"

export const Feeds = () => {

  const searchParams = useSearchParams()
  const feedKey = searchParams.get("feeds")
  const defaultkey = "last"

  const items =  [
    {key: "last", label: "En son"},
    {key: "forYou" , label: "Senin İçin"},
    {key: "saveds", label: "Kaydedilenler"}
  ]

  const check = (key : string) => {
    if (!feedKey) return key === defaultkey;
    return key === feedKey;
  }

  return (
    <div className="w-full flex">
      {items.map(item => <div className={cn("px-4 cursor-pointer py-2 group hover:border-gray-900 hover:border-b", check(item.key) && "border-b")}>
        <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900">{item.label}</span>
      </div>)}
    </div>
  )
}
