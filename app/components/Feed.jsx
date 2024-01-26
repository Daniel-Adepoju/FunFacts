'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { CardList } from './CardList'
import axios from 'axios'
import {useRouter} from 'next/navigation'



const Feed = () => {
  const router = useRouter()
  const [searchText,setSearchText] = useState('')

  const handleSearch = (e) => {
   e.preventDefault()
   router.push(`/search_field?search=${searchText}`)
   
  }

  return (
    <>
    <div className="lineTop"></div>
    <div className="feed">
      <div className="title">
      <h2> Feed </h2>
      </div>
      <form onSubmit={(e) => handleSearch(e)}>
    <input 
    placeholder="Search for a tag or text in content"
    value={searchText}
    className='search'
    required
   onChange={(e) => setSearchText(e.target.value)}
    /> 
    <input type="image" src='/logos/search.svg' className='searchIcon'/>
      </form>
      <CardList/>
    </div>
    </>
  )
}

export default Feed