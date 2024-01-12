import "./styles/css/styles.css"

import Nav from "./components/Nav"
import Provider from "./components/Provider"

export const metadata = {
  title:"Funfacts",
  description:"Discover and Share Fun Facts"
}

const Layout = ({children}) => {
  return (
    <html lang='eng'>
      <body>
        <Provider>
          <Nav />
        <main className="main">
          {children}
        </main>
        </Provider>
      </body>
    </html>
  )
}

export default Layout