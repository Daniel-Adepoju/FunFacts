'use client'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams} from "next/navigation"
import Form from "../components/Form"

const EditPost = () => {
    const router = useRouter()
  const [submitting,setSubmitting] = useState(false)
  const [post,setPost] = useState({
    content:'',
    tag:''
  })
  const searchParams = useSearchParams()
  const postId = searchParams.get('id')
  
  useEffect(() => {
  const getPostDetails = async() => {
    const res = await fetch(`/api/post/${postId}`)
    const data = await res.json()
   if (postId) setPost({content: data[0].content,tag: data[0].tag})
  }
getPostDetails()
  },[postId])


 const editPost = async (e) => {
   e.preventDefault()
   setSubmitting(true) 
   if(!postId) {
    alert('No id in search params')
   }
   try {
  const res = await fetch(`/api/post/${postId}`,{
    method:'PATCH',
    body: JSON.stringify({
     content:post.content,
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
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={editPost}

    />
  )
}

export default EditPost 