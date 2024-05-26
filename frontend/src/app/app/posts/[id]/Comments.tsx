"use client"

import { CommentResponse } from '@/client/post.client'
import React from 'react'
import { NewComment } from './NewComment';
import { CommentCard } from './CommentCard';

interface Props {
  comments : Array<CommentResponse>
  postId : string;
}

export const Comments = ({comments, postId} : Props) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl text-gray-900 font-medium">
        Yorumlar
      </h2>
      <div className="w-full mt-6">
        <NewComment postId={postId} />
      </div>
      <div>
        {comments.map(c => <div className="mt-8">
          <CommentCard comment={c} />
        </div>)}
      </div>
    </div>
  )
}
