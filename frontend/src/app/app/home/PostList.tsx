import { MultiPostItem } from '@/client/post.client'
import { PostCard } from '@/components/shared/PostCard'
import React from 'react'

interface Props {
  posts : Array<MultiPostItem>
}

export const PostList = ({ posts } : Props) => {
  return (
    <div className="w-full max-w-[800px]">
      {posts.map(post => 
        <div className="mb-6">
          <PostCard post={post} />
          <hr className="w-full mt-8" />
        </div>
      )}
      
    </div>
  )
}
