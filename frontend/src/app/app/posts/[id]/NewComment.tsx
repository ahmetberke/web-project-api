import postClient from '@/client/post.client';
import { TextAvatar } from '@/components/shared/TextAvatar';
import { Button, Input, message } from 'antd';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Props {
  postId: string;
}

export const NewComment = ({postId} : Props) => {

  const [content, setContent] = useState("");
  const [user, setUser] = useState<{username: string, fullname: string} | undefined>(undefined);
  const router = useRouter();
  
  useEffect(() => {
    if (!getCookie("user")) return;
    setUser(JSON.parse(getCookie("user")!) as {username: string, fullname: string})
  }, [getCookie("user")])

  const onSubmit = async () => {
    try {
      await postClient.newComment(postId, getCookie("token")!, content);
      setContent("");
      router.refresh();
    } catch {
      message.error("Yorumunuz paylaşılamadı, lütfen tekrar deneyiniz!");
    }
  }

  return (
    <div className="w-full">
      {user && <div className="w-full">
        <div className="flex items-center">
          <div>
            <TextAvatar fullname={user.fullname} />
          </div>
          <div className="ml-4">
            <div className="text-gray-800 font-medium">{user.fullname}</div>
            <div className="text-gray-500 text-xs  mt-[-4px]">@{user.username}</div>
          </div>
        </div>
        <div className="w-full mt-4">
          <Input.TextArea 
            value={content}
            onChange={(e) => setContent(e.target.value)} 
            size="large" 
            placeholder="Yorumunuz" 
            style={{resize: "none", height: "100px", padding:"20px" }} 
          />
        </div>
        <div className="w-full flex justify-end mt-2">
          <Button onClick={onSubmit} disabled={content.length < 10} type="primary" style={{paddingLeft: "50px", paddingRight: "50px"}}> Paylaş </Button>
        </div>
      </div>}
    </div>
  )
}
