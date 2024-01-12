import React from 'react'
import Card from './Card'


const Profile = ({name,data,handleEdit,handleDelete}) => {
  return (
    <>
   {name && <div className='profile'>{name}'s Profile</div>}
    <div className="userPosts">
      {data.map(post => {
        return <Card
        key={post._id} 
        post={post}
        handleDelete={() => handleDelete && handleDelete(post)}
        handleEdit={() => handleEdit && handleEdit(post)}/>
      })}
    </div>
    
    </>
  )
}

export default Profile