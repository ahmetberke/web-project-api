import Link from 'next/link'
import React from 'react'

export const NewPost = () => {
  return (
    <div className="w-[300px] h-[200px] p-4 bg-teal-100 rounded-md">
      <h2 className="text font-bold">
        Sen de Yazar Ol
      </h2>
      <h3 className="mt-2 text-semibold">
        Sadece Okur olma <br /> bir yandan <br /> yazmalısın
      </h3>
      <div className="mt-4">
        <Link className="bg-black text-white hover:underline text-sm p-2 rounded-md" href={"/app/new-post"}>
          yazmaya başla
        </Link>
      </div>
    </div>
  )
}
