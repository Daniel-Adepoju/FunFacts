'use client'
import { createContext, useCallback, useEffect, useState } from 'react'

import { CardList } from './CardList'

export const PostContext =  createContext()



const Feed = () => {
const [searchText,setSearchText] = useState('')
const [posts,setPosts] = useState()

const getPosts = async () => {
  try {
 const res = await fetch('/api/post')
 const data = await res.json()
 // if (posts.length === 0) {
   const newArr = data
   setPosts(newArr)
 // }
  } catch (error) {
    console.log(error)
  }
}
useEffect(() => {
  getPosts()
},[])
 console.log(posts)
  return (
    <>
    <div className="lineTop"></div>
    <div className="feed">
      <h2> Feed </h2>
      <form>
    <input 
    placeholder="Search for a tag or a username"
    value={searchText}
    className='search'
    required
   onChange={(e) => setSearchText(e.target.value)}
    /> 
      </form>
      <PostContext.Provider value={posts}>
      <CardList
      handleClick={() => (e)}
      />
    </PostContext.Provider>
    </div>
    </>
  )
}

export default Feed