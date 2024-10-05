import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CartContext = React.createContext()

export const useCartContext = () => {
  return useContext(CartContext)
}

const CartProvider = ({ children }) => {
  const localCart = localStorage.getItem('coffeeshop_cart')
  const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : [])
  const navigate = useNavigate()

  useEffect(() => {
    if (cart) {
      localStorage.setItem('coffeeshop_cart', JSON.stringify(cart))
    }
  }, [cart])

  const onAddToCart = (product, quantity = 1) => {
    const existed = cart.some((p) => p.product.id == product.id)
    if (!existed) {
      setCart([...cart, { product, quantity }])
    } else {
      setCart(
        cart.map((p) => {
          if (p.product.id == product.id) {
            return { ...p, quantity: p.quantity + quantity }
          }
          return p
        })
      )
    }
    navigate('/cart')
  }

  const onChangeQuantity = (product, quantity) => {
    if (quantity) {
      setCart(
        cart.map((p) => {
          if (p.product.id == product.id) {
            return { ...p, quantity }
          }
          return p
        })
      )
    } else {
      setCart(cart.filter((p) => p.product.id !== product.id))
    }
  }

  const value = {
    cart,
    setCart,
    onAddToCart,
    onChangeQuantity
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export default CartProvider
