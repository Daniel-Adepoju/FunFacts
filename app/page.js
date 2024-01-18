'use client'
import Feed from "./components/Feed"
import { useMenu } from "./components/MenuContext"
import DYK from "./components/DYK"

const Home = () => {
  const menu = useMenu()
  return (
    <>
    <div className='home' onClick={() => menu.setMenuOpen(false)}>
    <div className="title">
  {/* <h2>Discover and share fun facts</h2> */}
  <DYK />
      </div> 
    <Feed />
    </div>
    </>
  )

  }

export default Home