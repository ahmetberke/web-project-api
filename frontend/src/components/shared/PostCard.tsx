"use client"

import postClient, { MultiPostItem } from '@/client/post.client'
import { CalculateMinRead, LimitContent } from '@/lib/content'
import { LocaleDate } from '@/lib/date'
import { BookOutlined, HeartFilled, HeartOutlined, LikeOutlined, SaveOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { TextAvatar } from './TextAvatar'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'

interface Props {
  post : MultiPostItem
}

export const PostCard = ({post} : Props) => {

  const [user, setUser] = useState<{username: string, fullname: string, id: string} | undefined>(undefined);
  const router = useRouter();
  
  useEffect(() => {
    if (!getCookie("user")) return;
    setUser(JSON.parse(getCookie("user")!) as {username: string, fullname: string, id: string})
  }, [getCookie("user")])

  const handleOnClick = (id : string) => {
    window.location.href = "/app/posts/" + id
  }

  const handleLike = async () => {
    await postClient.like(post.id, getCookie("token")!);
    router.refresh();
  }

  const handleDislike = async () => {
    await postClient.dislike(post.id, getCookie("token")!);
    router.refresh();
  }

  return (
    <div className="h-auto w-full cursor-pointer">
      <div className="flex w-full items-center space-x-3">
        <div>
          <TextAvatar fullname={post.author.fullname} />
        </div>
        <div>
          <h3 className="text-sm font-medium">
            {post.author.fullname}
          </h3>
        </div>
        <div className="">
          <span className="text-sm text-gray-600">· {LocaleDate(new Date(post.createdAt))}</span>
        </div>
      </div>
      <div className="flex mt-2 break-words space-x-12">
        <div className="flex-grow flex flex-col min-w-0">
          <div className="h-[120px] group" onClick={() => handleOnClick(post.id)}>
            <h2 className="text-lg font-bold group-hover:underline">{post.title}</h2>
            <p className="text-wrap text-sm w-full break-words overflow-hidden word-break-break-all mt-2">{LimitContent(220, post.description)}</p>
          </div>
          <div className="mt-2 w-full flex">
            <div className="flex-grow flex items-center space-x-4">
              <div className="p-2 px-4 rounded-full text-xs font-medium bg-gray-100">
                technologie
              </div>
              <div className="text-xs text-gray-600 font-medium">
                {CalculateMinRead(post.content)} dakika
              </div>
              <div>·</div>
              <div className="text-xs text-teal-400 font-medium">
                {post.likes.length} Beğeni
              </div>
            </div>
            {user && <div className="flex-shrink-0 flex h-full items-center space-x-4">
              {post.likes.includes(user.id) ? 
                <HeartFilled onClick={handleDislike} className="text-red-500 hover:text-red-700" />
                :
                <HeartOutlined onClick={handleLike} className="text-gray-500 hover:text-gray-700" />
              }

              <BookOutlined className="text-gray-400 hover:text-gray-700" />
            </div>}
          </div>
        </div>
        <div className="w-[120px] h-[120px] flex-shrink-0">
          <img className="w-full" src="https://miro.medium.com/v2/resize:fill:140:140/1*jlMN0nRazHLOTl7x__K5kg.png" alt="" />
        </div>
      </div>
    </div>
  )
}
