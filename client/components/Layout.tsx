import { Outlet } from 'react-router-dom'
import Footer from './Footer'
// This is the layout everything sits upon
// Outlet goes in here

function Layout() {
  return (
    <>
    <main>
   
        <p>This is the layout</p>
      <Outlet />
 
    </main>
    <Footer/>
    </>
  )
}

export default Layout
