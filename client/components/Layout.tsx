import { Outlet } from 'react-router-dom'
import Footer from './Footer'
// This is the layout everything sits upon
// Outlet goes in here

function Layout() {
  return (
    <>
    <main>
      <div id="parent-container">
      <Outlet />
      </div>
    </main>
    <Footer/>
    </>
  )
}

export default Layout
