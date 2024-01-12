'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "../components/Form"

const CreatePost = () => {
    const {data: session} = useSession()
    const router = useRouter()
  const [submitting,setSubmitting] = useState(false)
  const [post,setPost] = useState({
    content:'',
    tag:''
  })

 const createPost = async (e) => {
   e.preventDefault()
   setSubmitting(true) 
   try {
  const res = await fetch('/api/post/new',{
    method:'POST',
    body: JSON.stringify({
     content:post.content,
     userId: session?.user.id,
     tag:post.tag
    })
  }) 
  if (res.ok) {
    setSubmitting(false)
    router.push('/')
  }
   } catch(err) {
    console.log(err)
   }
 }

  return (
    <Form 
    type='Create'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPost}

    />
  )
}

export default CreatePost