'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {signIn,signOut,useSession,getProviders} from "next-auth/react"
const Nav = () => {
  const {data:session} = useSession()
  const [isMenuOpen,setIsMenuOpen] = useState(false)
  const [providers,setProviders] = useState([])
 
 useEffect(() => {
  const grabProviders = async () => {
 const response =  await getProviders() 
 setProviders(response)
  }
  grabProviders() 
 },[])
   
  return (
    <nav className="nav">
    <Link href='/'>
    <Image
    src='/logos/logo1.svg'
    alt='funfacts logo'
    width={100}
    height={40}
    className="navLogo"
    priority
    />
    </Link>
    <Image 
    src={`/logos/${isMenuOpen ? 'close2' : 'menu2'}.svg`}
    alt='menu logo'
    width={30}
    height={30}
    className="menu"
    onClick={() => setIsMenuOpen(prev => !prev)}
    />

  <span className={`navItems ${isMenuOpen && 'active'}`}>
   {session?.user && <>
    <Link href={'/profile'} onClick={() => setIsMenuOpen(false)}>
          <img
          src={session?.user.image}
          alt='profile'
          width={37}
          height={37}
          className="profilePicture"/>
        </Link>
        <button className="createPost" onClick={() => setIsMenuOpen(false)}>
      <Link href={'/create-post'}>Create Post</Link></button>
        <button className="signOut" onClick={
          () => {
          setIsMenuOpen(false)
          signOut()}}> Sign Out </button> 
        </>}
        
        <>
    {providers ? Object.values(providers).map((provider) => {
     return <button
      type='button'
      key={`${provider.name + '1'}`}
      onClick={() => signIn(provider.id)}
      className={`signIn ${session?.user && 'hide'}`}>
         Sign In
      </button>
    }) : <button>Fail</button>}
    </>
    </span>

    <span className="navItemsDesktop">
       {session?.user && <>
       <button className="createPost" onClick={() => setIsMenuOpen(false)}>
        <Link href={'/create-post'}>Create Post</Link>
       </button>
        <button className="signOut" onClick={() => signOut()}> Sign Out </button>
        <Link href={'/profile'}>
          <img
          src={session?.user.image}
          alt='profile'
          width={37}
          height={37}
          className="profilePicture"/>
        </Link> 
        </>}
        <>
    {providers && Object.values(providers).map((provider) => {
     return <button
      type='button'
      key={provider.name}
      onClick={() => signIn(provider.id)}
      className={`signIn ${session?.user && 'hide'}`}>
         Sign In
      </button>
    })}
    </>
    </span> 
    </nav>
    
    
  )
}

export default Nav