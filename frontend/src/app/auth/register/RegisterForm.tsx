"use client"
import authClient from '@/client/auth.client';
import { Button, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Controller, Form, useForm } from 'react-hook-form';

type Fields = {
  email: string;
  username: string;
  fullname: string;
  password: string;
}

export const RegisterForm = () => {

  const {handleSubmit, control, setError, formState: {errors} } = useForm<Fields>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data : Fields) => {
    setLoading(true);
    try {
      await authClient.Register(data);
      router.refresh();
    } catch(e : any) {
      console.log(e);
      if (e.response.data.name === "Validation" ) {
        for (let d of e.response.data.details) {
          console.log(d);
          setError(d.name, {
            type: "manual",
            message: d.message
          });
        }
      }else {
        message.error("Bir sorun oluştu")
      }
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
          {errors.email && <div className="text-xs mt-2 text-red-400">
            {errors.email.message}
          </div>}
        </div>
        
      </div>
      <div className='my-4'>
        <h2>Kullanıcı Adı</h2>
        <div className="mt-2">
          <Controller
            control={control}
            name='username'
            render={({field}) => <Input 
              placeholder='Kullanıcı Adı'
              {...field}
              size='large'
            />}
          />
          {errors.username && <div className="text-xs mt-2 text-red-400">
            {errors.username.message}
          </div>}
        </div>
      </div>
      <div className='my-4'>
        <h2>İsim Soyisim</h2>
        <div className="mt-2">
          <Controller
            control={control}
            name='fullname'
            render={({field}) => <Input 
              placeholder='İsim Soyisim'
              {...field}
              size='large'
            />}
          />
          {errors.fullname && <div className="text-xs mt-2 text-red-400">
            {errors.fullname.message}
          </div>}
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
          {errors.password && <div className="text-xs mt-2 text-red-400">
            {errors.password.message}
          </div>}
        </div>
      </div>
      <div className="my-4">
        <Button type='primary' size='large' style={{width: "100%"}} htmlType='submit'>
          Giriş Yap
        </Button>
      </div>
    </form>
  )
}
