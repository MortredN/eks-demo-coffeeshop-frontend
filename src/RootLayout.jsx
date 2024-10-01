/* eslint-disable react/prop-types */
import { Link, Outlet } from 'react-router-dom'

const Root = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <nav className="bg-[#2b405b] text-white">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
          <Link to="/">
            <h1 className="text-lg font-semibold">Coffee Shop</h1>
          </Link>
          <ul className="text-xs uppercase font-medium flex items-center divide-x divide-white/50">
            <li className="px-4">
              <Link to="/cart"><img src="/images/cart.svg" className='size-6'/></Link>
            </li>
            {/* <li className="px-4">
              <Link to="/order">Your orders</Link>
            </li> */}
            <li className="pl-4">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-8">{children ?? <Outlet />}</div>
    </div>
  )
}
export default Root
