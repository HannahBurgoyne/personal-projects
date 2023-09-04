import { Outlet } from 'react-router-dom'
import Footer from './Footer'
// This is the layout everything sits upon
// Outlet goes in here

function Layout() {
  return (
    <>
      <main className="page-container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
