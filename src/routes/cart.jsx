import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { useCartContext } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

const CartItem = ({ product, quantity, onChangeQuantity }) => {
  const enforceMinMax = (e) => {
    if (e.target.value != '') {
      if (parseInt(e.target.value) < 1) {
        e.target.value = 1
      }
      if (parseInt(e.target.value) > 10) {
        e.target.value = 10
      }
    } else {
      e.target.value = 1
    }
  }
  const onMinus = () => {
    onChangeQuantity(quantity - 1)
  }
  const onPlus = () => {
    onChangeQuantity(quantity >= 10 ? 10 : quantity + 1)
  }

  return (
    <tr>
      <td className="border-b border-gray-300 py-4">
        <div className="flex items-center gap-x-4">
          {product?.image ? (
            <img src={product.image} className="size-20 rounded-lg object-cover" />
          ) : (
            <div className="size-20 rounded-lg bg-gray-200" />
          )}
          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-600">{product?.brand}</p>
            <p className="font-medium">{product?.name}</p>
            <p className="">${Number(product?.price).toFixed(2)} CAD</p>
          </div>
        </div>
      </td>

      <td className="border-b border-gray-300 py-4">
        <div className="w-fit flex items-center border border-gray-300">
          <button
            type="button"
            onClick={onMinus}
            className="size-8 flex items-center justify-center"
          >
            -
          </button>
          <input
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) => onChangeQuantity(parseInt(e.target.value))}
            onKeyUp={(e) => enforceMinMax(e)}
            className="size-8 text-center leading-8"
          />
          <button
            type="button"
            onClick={onPlus}
            className="size-8 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </td>

      <td className="border-b border-gray-300 py-4 text-right md:w-[120px]">
        ${(quantity * product?.price).toFixed(2)} CAD
      </td>
    </tr>
  )
}

const CartPage = () => {
  const { cart, setCart, onChangeQuantity } = useCartContext()
  const auth = useAuth()
  const navigate = useNavigate()

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => item.product.price * item.quantity + acc, 0),
    [cart]
  )
  const tax = useMemo(() => subtotal * 0.13, [subtotal])
  const total = useMemo(() => subtotal * 1.13, [subtotal])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onPlaceOrder = async () => {
    const data = {
      products: cart?.map((item) => ({ id: item.product.id, quantity: item.quantity })),
      name,
      email,
      password
    }
    const headers = { 'Content-Type': 'application/json' }
    if (auth.token) {
      headers['Authorization'] = `Bearer ${auth.token}`
    } else {
      if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(name)) {
        alert('Missing fields')
        return
      }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_SHOPPING_URL}/order`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.customer && res.accessToken) {
        auth.setUser(res.customer)
        auth.setToken(res.accessToken)
        localStorage.setItem('coffeeshop_site', res.accessToken)
      }
      if (res.order) {
        setCart([])
        navigate(`/order/${res.order.id}`)
      } else alert(res.message)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="mt-12 flex flex-col">
      <Link to="/" className="text-gray-800 text-sm mb-8 hover:underline">
        ← Back to Shop
      </Link>
      <h2 className="text-3xl font-bold">Shopping Cart</h2>

      <div className="mt-12 flex flex-col md:flex-row md:items-start gap-12">
        <div className="w-full md:w-2/3 flex flex-col">
          <table className="text-left border-collapse">
            <thead>
              <tr>
                <th className="font-light text-sm border-b border-gray-300 pb-2">Product</th>
                <th className="font-light text-sm border-b border-gray-300 pb-2">Quantity</th>
                <th className="font-light text-sm border-b border-gray-300 pb-2 text-right md:w-[120px]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item) => (
                <CartItem
                  key={item.product?.id}
                  product={item.product}
                  quantity={item.quantity}
                  onChangeQuantity={(quantity) => onChangeQuantity(item.product, quantity)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full md:w-1/3 bg-slate-200 flex flex-col p-8">
          <h3 className="text-2xl font-bold text-center">Summary</h3>
          <div className="flex flex-col gap-y-1 mt-8">
            <div className="flex items-center justify-between">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)} CAD</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Taxes</p>
              <p>${tax.toFixed(2)} CAD</p>
            </div>
            <div className="flex items-center justify-between font-medium">
              <p>Total</p>
              <p>${total.toFixed(2)} CAD</p>
            </div>
          </div>

          {!auth.token && (
            <form className="mt-8 flex flex-col items-center">
              <h1 className="text-sm font-medium text-center mb-2">
                An account will be created when you place your order
              </h1>
              <div className="flex flex-col max-w-md mx-auto w-full gap-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="text-sm border-b border-gray-800 bg-transparent w-full py-2 focus-visible:outline-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="text-sm border-b border-gray-800 bg-transparent w-full py-2 focus-visible:outline-none"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="text-sm border-b border-gray-800  bg-transparent w-full py-2 focus-visible:outline-none"
                />
              </div>
            </form>
          )}

          <button
            type="button"
            onClick={() => onPlaceOrder()}
            className="bg-slate-600 hover:bg-slate-800 text-white py-2 px-4 mt-8 w-full transition-colors"
          >
            Place an Order
          </button>
        </div>
      </div>
    </div>
  )
}
export default CartPage
