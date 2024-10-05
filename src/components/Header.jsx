import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCartContext } from '../contexts/CartContext'

const Header = () => {
  const auth = useAuth()
  const { cart } = useCartContext()

  return (
    <nav className="bg-[#2b405b] text-white">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <Link to="/">
          <h1 className="text-lg font-semibold">Coffee Shop</h1>
        </Link>
        <ul className="text-xs uppercase font-medium flex items-center divide-x divide-white/50">
          <li className="px-4">
            <Link to="/cart" className="relative">
              <img src="/images/cart.svg" className="size-6" />
              {cart?.length ? (
                <span className="absolute -bottom-1.5 -right-1.5 bg-gray-500 text-white rounded-full size-4 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              ) : null}
            </Link>
          </li>
          {auth?.token && (
            <li className="px-4">
              <Link to="/order">Your orders</Link>
            </li>
          )}
          {auth?.token ? (
            <li className="pl-4">
              <button type="button" onClick={() => auth.onLogout()} className="uppercase">
                Logout
              </button>
            </li>
          ) : (
            <li className="pl-4">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
export default Header
