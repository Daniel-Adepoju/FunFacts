import { connecToDB } from "../../utils/database"
import Post from "../../models/post"

export const GET = async (req,{params}) => {
    try {
  await connecToDB()
  const post = await Post.findById(params.id).populate("creator")
  if(!post) {
    return new Response('Post not found', {status: 404})
  }
  return new Response(JSON.stringify([post]),{status:200})
    } catch(err) {
 console.log(err)
 return new Response('Failed to get posts', {status: 500})
    }
}



export const PATCH = async function(req,{params}) {
 const {content, tag} = await req.json()
 
 try {

 await connecToDB()
 const postToEdit = await Post.findOneAndUpdate(
    {_id:params.id},
    {content,tag},
    {new:true,runValidators:true}
    )
 if(!postToEdit) return new Response('Failed to find post', {status: 500})
  await postToEdit.save()
 return new Response(JSON.stringify([postToEdit]), {status:200})

 } catch(err) {
    return new Response('Failed to update post', {status: 500})
 }
}

export const DELETE = async function(req,{params}) {
 
    try {
        await connecToDB()
         const postToDelete = await Post.findOneAndDelete(
            {_id:params.id},
            {new:true,runValidators:true})
         if(!postToDelete) return new Response('Failed to find post', {status: 500})
         return new Response(JSON.stringify(postToDelete), {status:200})
    } catch(err) {
 return new Response('Failed to delete post', {status: 500}) 
    }
}