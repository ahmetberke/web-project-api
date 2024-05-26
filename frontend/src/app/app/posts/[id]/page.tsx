import postClient from '@/client/post.client'
import { TextAvatar } from '@/components/shared/TextAvatar';
import { GetServerToken } from '@/lib/auth'
import React from 'react'
import { Comments } from './Comments';

export default async function Post({params}: {params : {id: string}}) {
  
  const token = GetServerToken();

  const post = await postClient.getById(params.id, token!);

  console.log(post);

  return (
    <div className="container mx-auto w-full flex px-6 md:px-24 py-16">
      <div>
        <div className="flex space-x-6 items-center">
          <div>
            <TextAvatar size="large" fullname={post.author.fullname} />
          </div>
          <div className="text-start">
            <div className="text-lg">{post.author.fullname}</div>
            <div className="mt-[-6px] text-sm text-gray-500">@{post.author.username}</div>
          </div>
        </div>
        <div className="mt-12">
          <div>
            <h1 className="text-3xl font-semibold text-gray-950">{post.title}</h1>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-medium text-gray-600">{post.description}</h2>
          </div>
          <div className="mt-10 text-gray-600" dangerouslySetInnerHTML={{__html: post.content}} ></div>
        </div>
        <div className="w-full">
          <Comments postId={post.id} comments={post.comments} />
        </div>
      </div>
    </div>
  )
}
