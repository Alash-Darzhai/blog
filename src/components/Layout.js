import { NavLink, Outlet } from 'react-router-dom'

const setActive = ({ isActive }) => (isActive ? 'active-link' : '')

const Layout = () => {
  return (
    <>
      <header>
        <NavLink to="/" className={setActive}>
          Home
        </NavLink>
        <NavLink to="/blog" className={setActive}>
          Blog
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </header>
      <main>
        <Outlet />
      </main>

      <footer>2021</footer>
    </>
  )
}

export default Layout
