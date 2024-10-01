import { useState } from 'react'

// TODO: Replace with product from backend
const product = {
  subname: 'roasti-brazilian-yellow-bourbon',
  name: 'Roasti - Brazilian Yellow Bourbon',
  brand: 'Roasti Coffee',
  price: 21.01,
  image: 'https://philsebastian.com/cdn/shop/files/thestandard_2000x.jpg?v=1686780149',
  format: 'Whole Bean',
  quantity: '300gr'
}

const CartItem = () => {
  const [quantity, setQuantity] = useState(1)

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
    setQuantity((v) => (v <= 1 ? 1 : v - 1))
  }
  const onPlus = () => {
    setQuantity((v) => (v >= 10 ? 10 : v + 1))
  }

  return (
    <tr>
      <td className="border-b border-gray-300 py-4">
        <div className="flex items-center gap-x-4">
          <img src={product.image} className="size-20 rounded-lg object-cover" />
          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-600">{product.brand}</p>
            <p className="font-medium">{product.name}</p>
            <p className="">${product.price.toFixed(2)} CAD</p>
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
            onChange={(e) => setQuantity(parseInt(e.target.value))}
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
        ${(quantity * product.price).toFixed(2)} CAD
      </td>
    </tr>
  )
}

const CartPage = () => {
  return (
    <div className="mt-12 flex flex-col">
      <h2 className="text-3xl font-bold">Shopping Cart</h2>

      <div className="mt-12 flex flex-col md:flex-row md:items-start gap-12">
        <div className="w-full md:w-2/3 flex flex-col">
          <table className="text-left border-collapse">
            <tr>
              <th className="font-light text-sm border-b border-gray-300 pb-2">Product</th>
              <th className="font-light text-sm border-b border-gray-300 pb-2">Quantity</th>
              <th className="font-light text-sm border-b border-gray-300 pb-2 text-right md:w-[120px]">
                Total
              </th>
            </tr>
            <CartItem />
            <CartItem />
          </table>
        </div>

        <div className="w-full md:w-1/3 bg-slate-200 flex flex-col p-8">
          <h3 className="text-2xl font-bold text-center">Summary</h3>
          <div className="flex flex-col gap-y-1 mt-8">
            <div className="flex items-center justify-between">
              <p>Subtotal</p>
              <p>${(150.0).toFixed(2)} CAD</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Taxes</p>
              <p>${(150.0 * 0.13).toFixed(2)} CAD</p>
            </div>
            <div className="flex items-center justify-between font-medium">
              <p>Total</p>
              <p>${(150.0 * 1.13).toFixed(2)} CAD</p>
            </div>
          </div>

          <form className="mt-8 flex flex-col items-center">
            <h1 className="text-sm font-medium text-center mb-2">
              An account will be created when you place your order
            </h1>
            <div className="flex flex-col max-w-md mx-auto w-full gap-2">
              <input
                placeholder="Full name"
                className="text-sm border-b border-gray-800 bg-transparent w-full py-2 focus-visible:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="text-sm border-b border-gray-800 bg-transparent w-full py-2 focus-visible:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="text-sm border-b border-gray-800  bg-transparent w-full py-2 focus-visible:outline-none"
              />
            </div>
          </form>

          <button
            type="button"
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
