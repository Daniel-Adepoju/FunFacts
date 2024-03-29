"use client"
import { useState} from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

const Card = ({ post, handleClick, handleEdit, handleDelete,refValue}) => {
  const{data:session} = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(post.content)
    setTimeout(() => setCopied(false), 3000)
  }
  
  return (
    <>
      <div ref={refValue}>
        <div className="head">
          <div className="cardImage">
            <img
              src={post.creator.image}
              alt="user image"
            />
          </div>
          <div className="creatorDeets">
            <div className="name">
              <h4>{post.creator.username}</h4>
            </div>
            <div className="email">
              <h4> {post.creator.email} </h4>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="content">
            <p>{post.content}</p>
          </div>
          <h5>
            <p>{!post.tag.startsWith("#") ? `#${post.tag}` : post.tag}</p>
          </h5>
          <div
            className="copyBtn"
            onClick={() => handleCopy()}
          >
            <img
              src={`${!copied ? "/logos/clipboard.svg" : "/logos/clipboard2.svg"}`}
              alt="clipboard icon"
            />
            <span> Copy</span>
          </div>
        </div>
        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="footer">
            <div className="cardAction" onClick={handleEdit}>
              <img src='logos/edit.svg'/> <span>Edit</span>
              </div>
            <div className="cardAction" onClick={handleDelete}> 
            <img src='/logos/delete.svg' /> <span>Delete</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Card
