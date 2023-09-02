import { Outlet } from 'react-router-dom'
// This is the layout everything sits upon
// Outlet goes in here

function Layout() {
  return (
    <main>
      <div id="parent-container">
      <Outlet />
     
      </div>
    </main>
  )
}

export default Layout
