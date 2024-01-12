import { connecToDB } from "../../utils/database"
import Post from "../../models/post"

export const POST = async (req,res) => {
const {userId,content,tag} = await req.json()
 try {
 await connecToDB()
 const newPost = new Post({
    creator:userId,
    tag,
    content
    })
    await newPost.save()
    return new Response(JSON.stringify(newPost), {status:201})
 } catch(err) {
    return new Response("Failed to create a new post",{status:500})
 }
}