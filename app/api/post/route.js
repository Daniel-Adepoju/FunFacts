import { connecToDB } from "../utils/database"
import Post from "../models/post"

export const GET = async (req,res) => {
    try {
  await connecToDB()
  const posts = await Post.find().populate("creator")
  
  return new Response(JSON.stringify(posts),{status:200})
    } catch(err) {
 console.log(err)
 return new Response('Failed to get posts', {status: 500})
    }
}
