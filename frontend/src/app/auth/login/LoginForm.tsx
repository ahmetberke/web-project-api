"use client"
import authClient from '@/client/auth.client';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Controller, Form, useForm } from 'react-hook-form';

type Fields = {
  email: string;
  password: string;
}

export const LoginForm = () => {

  const {handleSubmit, control } = useForm<Fields>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data : Fields) => {
    setLoading(true);
    try {
      await authClient.Login(data);
      router.refresh();
    } catch(e : any) {
      setError(e.response.data.message);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='my-4'>
        <h2>E-posta Adresi</h2>
        <div className="mt-2">
          <Controller
            control={control}
            name='email'
            render={({field}) => <Input 
              placeholder='E-posta adresi'
              {...field}
              size='large'
            />}
          />
        </div>
      </div>
      <div className='my-4'>
        <h2>Şifre</h2>
        <div className="mt-2">
          <Controller
            control={control}
            name='password'
            render={({field}) => <Input 
              placeholder='Şifre'
              {...field}
              size='large'
              type='password'
            />}
          />
        </div>
      </div>
      {error != "" && <div>
        <p className="text-red-400 text-sm">
          {error}
        </p>
      </div>}
      <div className="my-4">
        <Button type='primary' size='large' style={{width: "100%"}} htmlType='submit'>
          Giriş Yap
        </Button>
      </div>
    </form>
  )
}
