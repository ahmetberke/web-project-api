import { CommentResponse } from '@/client/post.client'
import { TextAvatar } from '@/components/shared/TextAvatar'
import { LocaleDate } from '@/lib/date'
import React from 'react'

interface Props {
  comment : CommentResponse
}

export const CommentCard = ({comment} : Props) => {
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex items-center">
          <div>
            <TextAvatar fullname={comment.author.fullname} />
          </div>
          <div className="ml-4">
            <div className="text-gray-800 font-medium">{comment.author.fullname}</div>
            <div className="text-gray-500 text-xs  mt-[-4px]">@{comment.author.username}</div>
          </div>
          <div className="ml-4">
            <div className="text-gray-500 text-xs  mt-[-4px]"> · {LocaleDate(new Date(comment.createdAt))}</div>
          </div>
        </div>
        <div className="w-full mt-4">
          {comment.content}
        </div>
      </div>
    </div>
  )
}
