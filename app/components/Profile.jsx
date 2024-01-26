
import Card from './Card'
import { useMenu } from './MenuContext'
import axios from "axios"
import { useState, useCallback,useRef} from "react"
import { useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import Loader from "./Loader"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const fetchPosts = axios.create({
  baseURL: process.env.BASE_URL
})

const Profile = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const menu = useMenu()
  const observer = useRef()
  const [limit,setLimit] = useState(10)
  const queryClient = useQueryClient()
  const dialogRef = useRef()
  const getPosts = async (page) => {
    try {
   const res = await fetchPosts.get(`/api/users/${session?.user.id}/posts?page=${page}&limit=${limit}`)
   const data = res
     const newArr = data.data[0]
     return newArr
    } catch (error) {
      console.log(error)
    }
  }
  const deletePost = async (id) => {
    try {
     const res = await fetchPosts.delete(`/api/post/${id.toString()}`)
   } catch (error) {
     console.log(error)
   }
  }

  const handleEdit = (post) => {
    router.push(`/edit-post?id=${post._id}`)
}
  
  const postsQuery = useInfiniteQuery({
    queryKey:['posts', 'infinite'],
    getNextPageParam:(prevData) => {
      return prevData.cursor + 1 || undefined
    },
    queryFn:({pageParam = 1}) => {
      return getPosts(pageParam)
    }
  })

  const postsDelete = useMutation({
    mutationFn:(id) => {
        deletePost(id)
     } ,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', 'infinite'])
    }
  })


     
  const observerCallback = useCallback(node => {
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
   postsQuery.fetchNextPage()
    }
    })
  
   if(node) return observer.current.observe(node)
  },[postsQuery.isLoading, postsQuery.hasNextPage])
  
  
  const mappedPosts = postsQuery?.data?.pages.flatMap((item,index) => {
    return item.posts.map((post,index) => {
      return (
      <div key={post._id}>
        <div key={post._id} className="postCard"> <Card
        key={post._id}
        post={post}
        refValue={index === 9 ? observerCallback : null}
        handleDelete={() => dialogRef?.current.showModal()}
        handleEdit={() => handleEdit(post)}
        />
       </div>
        {index === 0 ? <dialog key={index} ref={dialogRef}>
      <div className="con">
      <img src="/logos/trash-alt.svg" alt="trashcan icon" />
      <div>Are you sure you want to delete this post</div>
      <div>
        <button className='btn' onClick={() => dialogRef?.current.close()}>
            No
         </button>
        <button className='btn'  onClick={() => {
          postsDelete.mutate(post._id)
          dialogRef?.current.close()
           }}>
          Yes
          </button>
        </div>
      </div>
      </dialog> :''}
               </div>)
        })
      })
      
      if(postsQuery.isError) {
        return <div>{JSON.stringify(postsQuery.error)}</div>
      }
      if(mappedPosts?.length === 0) {
        return (
          <div className="emptyDisplay"> Nothing to display</div>
        )
      }

  return (
    <>

    <div className='profile' onClick={() => menu.setMenuOpen(false)}>
   {!postsQuery.isLoading && <div className='title'>{session?.user.name}'s Profile</div>}
   <>
      {postsQuery.isLoading ? <Loader /> : <div className="cardList">{mappedPosts}</div>}
       <div className="title">
        <h2>
        {postsQuery.isFetchingNextPage ? <Loader/> : ''}
        </h2>
        </div>
    
        </>
    </div>


    </>
  )
}

export default Profile