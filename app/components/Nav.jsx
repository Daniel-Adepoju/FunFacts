'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useContext } from "react"
import {signIn,signOut,useSession,getProviders} from "next-auth/react"
import { useMenu } from "./MenuContext"
import { useRouter } from "next/navigation"

const Nav = () => {
  const {data:session} = useSession()
  const [providers,setProviders] = useState([])
  const router = useRouter()
  const menu = useMenu()
 
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
    src={`/logos/${menu.open ? 'close2' : 'menu2'}.svg`}
    alt='menu logo'
    width={30}
    height={30}
    className="menu"
    onClick={() => menu.setMenuOpen(prev => !prev)}
    />

  <span className={`navItems ${menu.open && 'active'}`}>
   {session?.user && <>
    <Link href={'/profile'} onClick={() => menu.setMenuOpen(false)}>
          <img
          src={session?.user.image}
          alt='profile'
          width={37}
          height={37}
          className="profilePicture"/>
        </Link>
 <button className="createPost" onClick={() => {
  menu.setMenuOpen(false)
   router.push('/create-post')
 }}>
      Create Post
      </button>
        <button className="signOut" onClick={
          () => {
          menu.setMenuOpen(false)
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
 <button className="createPost" onClick={() =>  router.push('/create-post')}>
       Create Post
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