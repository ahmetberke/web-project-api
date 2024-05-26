"use client"

import authClient from '@/client/auth.client'
import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Actions = () => {

  const router = useRouter();

  const onClickLogout = () => {
    authClient.Logout();
    router.refresh();
  }

  return (
    <div className="h-full flex items-center px-10 space-x-2">
      <Button 
        onClick={onClickLogout}
        className="flex items-center"
      >
        <LogoutOutlined />
      </Button>
    </div>
  )
}
