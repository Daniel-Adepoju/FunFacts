'use client'
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "../components/Profile"


const MyProfile = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [posts,setPosts] = useState([])
    const getPosts = async () => {
        try {
       const res = await fetch(`/api/users/${session?.user.id}/posts`)
       const data = await res.json()
      
         const newArr = data
         setPosts(newArr)
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
    if(session?.user.id) getPosts()
      },[])

    const handleEdit = (post) => {
        router.push(`/edit-post?id=${post._id}`)
    }
    const handleDelete = async (post) => {
      const isConfirmed = confirm(`Are you sure you want to delete this post`)
     if(isConfirmed){
       try {
        const res = await fetch(`/api/post/${post._id.toString()}`, {
          method: "DELETE",
        })
       if (res.ok) {
         const newArr = posts.filter((p) => p._id !== post._id)
         setPosts(newArr)
       }
      } catch (error) {
        console.log(error)
      }
    }
    }


    return (
    <Profile
    name={session?.user.name}
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile