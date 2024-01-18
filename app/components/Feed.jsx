'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { CardList } from './CardList'
import axios from 'axios'
export const PostContext =  createContext()



const Feed = () => {
  const [searchText,setSearchText] = useState('')
 
  return (
    <>
    <div className="lineTop"></div>
    <div className="feed">
      <div className="title">
      <h2> Feed </h2>
      </div>
      <form>
    <input 
    placeholder="Search for a tag or a username"
    value={searchText}
    className='search'
    required
   onChange={(e) => setSearchText(e.target.value)}
    /> 
      </form>
      <CardList/>
    </div>
    </>
  )
}

export default Feed