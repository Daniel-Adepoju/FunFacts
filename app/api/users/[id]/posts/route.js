import { connecToDB } from "../../../utils/database"
import Post from "../../../models/post"

export const GET = async (req,{params}) => {
  const {searchParams} = new URL(req.url)
  const page = searchParams.get('page') || 1
  const limit = searchParams.get('limit') || 10
  const skipNum = Number((page- 1) * limit)
  let cursor = Number((page * limit) / limit)

  try {
    await connecToDB()
  const postsDeets = await Post.find()
  const numOfPages = Math.ceil(postsDeets.length / Number(limit))
  if (cursor >= numOfPages) {
    cursor = undefined
  }
  let postsConfig = Post.find({creator:params.id}).sort('-createdAt').populate("creator")

   postsConfig = postsConfig.skip(skipNum).limit(limit)
  
  const posts = await postsConfig
  return new Response(JSON.stringify([{posts,cursor}]),{status:200})
//     try {
//         await connecToDB()
//   const posts = await Post.find({creator:params.id}).sort('-createdAt').populate("creator")
//   return new Response(JSON.stringify(posts),{status:200})
    } catch(err) {
 console.log(err)
 return new Response(`Failed to get user's posts`, {status: 500})
    }
}
