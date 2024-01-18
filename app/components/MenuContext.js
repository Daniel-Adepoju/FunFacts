'use client'
import React, { createContext, useContext,useState} from 'react'

export const MenuContext = createContext()
export const useMenu = () => useContext(MenuContext)

const Menu = ({children}) => {
    const [open,setMenuOpen] = useState(false)
    
  return (
    <MenuContext.Provider value={{open,setMenuOpen}}>
            {children}
    </MenuContext.Provider>
  )
}
export default Menu