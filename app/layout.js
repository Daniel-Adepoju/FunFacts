

import "./styles/css/styles.css"
import Nav from "./components/Nav"
import Provider from "./components/Provider"
import Menu from "./components/MenuContext"
import ReactQueryProvider from "./reactQueryProvider"

export const metadata = {
  title:"Funfacts",
  description:"Discover and Share Fun Facts"
}

const Layout = ({children}) => {
  return (
    <html lang='eng'>
      <body>
        <ReactQueryProvider>
        <Provider>
          <Menu>
          <Nav />
        <main className="main">
          {children}
        </main>
          </Menu>
        </Provider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}

export default Layout