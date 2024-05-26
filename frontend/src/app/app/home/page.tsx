import postClient from '@/client/post.client';
import { PostCard } from '@/components/shared/PostCard';
import { GetServerToken } from '@/lib/auth'
import axios from 'axios';
import { redirect } from 'next/navigation';
import React from 'react'
import { PostList } from './PostList';
import { NewPost } from './NewPost';
import { Feeds } from './Feeds';

export default async function Home() {

  const token = GetServerToken()!;

  try {
    const posts = await postClient.getAll(token);
    return (
      <div className="container mx-auto w-full flex px-0 md:px-12 py-16">
        <div className="px-24 flex-grow">
          <Feeds />
          <div className="flex justify-end mt-8">
            <PostList posts={posts} />
          </div>
        </div>
        <div className="flex w-[500px] flex-shrink-0 px-6">
          <NewPost />
        </div>
      </div>
    )
  } catch(e) {
    console.log(e);
  }

}
