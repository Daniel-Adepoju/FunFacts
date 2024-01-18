'use client'
import { useRef} from "react"
import Card from './Card'
import axios from "axios"
import { useState, useCallback} from "react"
import { useInfiniteQuery} from "@tanstack/react-query"
import Loader from "./Loader"
const fetchPosts = axios.create({
  baseURL: process.env.BASE_URL
})

export const CardList = () => {
const observer = useRef()
const [limit,setLimit] = useState(10)

const getPosts = async (page) => {
  try {
 const res = await fetchPosts.get(`/api/post?page=${page}&limit=${limit}`)
 const data = res
   const newArr = data.data[0]
   return newArr
  } catch (error) {
    console.log(error)
  }
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
   
const observerCallback = useCallback(node => {
  if(observer.current) observer.current.disconnect()
  observer.current = new IntersectionObserver((entries) => {
  if(entries[0].isIntersecting) {
 console.log(entries[0].target)
 postsQuery.fetchNextPage()
  }
  })

 if(node) return observer.current.observe(node)
},[postsQuery.isLoading, postsQuery.hasNextPage])

    if(postsQuery.isError) {
      return <div>{JSON.stringify(postsQuery.error)}</div>
    }

    const mappedPosts =
     postsQuery?.data?.pages.flatMap((item,index) => {
      return item.posts.map((post,index) => {
             return (
              <div key={index} className="postCard"> <Card
             key={post._id}
             post={post}
             refValue={index === 9 ? observerCallback : null}
             />
             </div>)
      })
        })

    return (
      <>
    {postsQuery.isLoading ? <Loader /> : <div className="cardList">{mappedPosts}</div>}
     <div className="title">
      <h2>
      {postsQuery.isFetchingNextPage ? <Loader/> : ''}
      </h2>
      </div>
  
      </>
    )
  }