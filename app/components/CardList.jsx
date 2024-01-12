'use client'
import { useContext } from "react"
import { PostContext } from "./Feed"
import Card from './Card'

export const CardList = ({handleClick}) => {
    const posts = useContext(PostContext)
    return (
      <>
      <div className="cardList">
     {posts?.map((post) => {
     return <Card
      key={post._id}
      post={post}
      handleClick={handleClick}
      />
     })}
      </div> 
  
      </>
    )
  }