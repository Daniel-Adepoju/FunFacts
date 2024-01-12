import { connecToDB } from "../utils/database"
import Post from "../models/post"

export const GET = async (req,res) => {
    try {
  await connecToDB()
  const posts = await Post.findOne().populate("creator")
  console.log(posts)
  return new Response(JSON.stringify([posts]),{status:200})
    } catch(err) {
 console.log(err)
 return new Response('Failed to get posts', {status: 500})
    }
}
