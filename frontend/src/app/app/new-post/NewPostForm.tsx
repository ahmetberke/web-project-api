import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Button, Input, message } from 'antd'
import Editor from "@ckeditor/ckeditor5-build-classic"
import React, { useEffect, useState } from 'react'
import postClient from '@/client/post.client'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'

export const NewPostForm = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("<p><b>Hello</b> World!</p>");
  const [cookies, setCookies, removeCookies] = useCookies(["token", "postTitle", "postDescription", "postContent"]);
  const router = useRouter();
  const [errors, setErrors] = useState<Array<{name: string, message: string}>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(cookies.postTitle || "");
    setDescription(cookies.postDescription || "");
    setContent(cookies.postContent || "");
  }, [cookies]);

  const editorConfigurations = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
    ]
  };

  const onSubmit = async () => {
    setErrors([]);
    setLoading(true);
    try {
      const payload = {title, description, content}
      await postClient.create(payload, cookies.token);
      message.success("Yazınız başarıyla paylaşıldı");
      removeCookies("postTitle");
      removeCookies("postDescription");
      removeCookies("postContent");
      router.replace("/app/home");
    } catch (e : any) {
      setErrors(e.response.data.details);
      console.log(e);
    }
    setLoading(false);
  }

  const onSave = () => {
    setCookies("postTitle", title);
    setCookies("postContent", content);
    setCookies("postDescription", description);
  }

  return (
    <div className="flex flex-col w-full mb-24">
      <div className="fixed z-50 right-0 bottom-0 mr-12 mb-12 space-x-4 flex">
        <Button type="primary" onClick={onSubmit}>{loading ? "Paylaşılıyor" : "Paylaş"}</Button>
        <Button type="default" onClick={onSave}>Kaydet</Button>
      </div>
      <div>
        <Input
          style={{border: "none", width: "100%", fontSize: "32px", outline: "none", boxShadow: "none"}} 
          placeholder={'Başlık '}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.find(e => e.name === "title") && <p className="text-sm text-red-400">
          {errors.find(e => e.name === "title")?.message}
        </p>}
      </div>
      <div className="mt-4">
        <Input.TextArea
          maxLength={200}
          style={{border: "none", resize:"none", width: "100%", fontSize: "24px", outline: "none", boxShadow: "none", height: "120px"}} 
          placeholder={'Ön Yazı '}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.find(e => e.name === "descriptipn") && <p className="text-sm text-red-400">
          {errors.find(e => e.name === "descriptipn")?.message}
        </p>}
      </div>
      <div className="mt-4">
        <CKEditor 
          editor={ Editor } 
          config={ editorConfigurations }
          onChange={(e, editor) => setContent(editor.getData())}
          data={content}
        />
      </div>
    </div>
  )
}
