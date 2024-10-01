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

const ProductDetailPage = () => {
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
    <div className="mt-12 flex flex-col md:flex-row md:items-start gap-12">
      <img src={product.image} className="w-full md:w-1/3 aspect-square object-cover rounded-lg" />

      <div className="w-full md:w-2/3 flex flex-col items-start">
        <p className="text-sm text-gray-600">{product.brand}</p>
        <h2 className="text-3xl font-bold mt-2">{product.name}</h2>
        <h3 className="text-3xl mt-6">${product.price.toFixed(2)} CAD</h3>
        <div className="mt-8">
          <div className="inline-flex items-center gap-x-1.5 mr-4">
            <img src="/images/quantity.webp" className="size-8" />
            <span className="text-sm">
              <b className="font-medium inline">Quantity: </b>
              <p className="inline">{product.quantity}</p>
            </span>
          </div>
          <div className="inline-flex items-center gap-x-1.5 mr-4">
            <img src="/images/format.webp" className="size-8" />
            <span className="text-sm">
              <b className="font-medium inline">Format: </b>
              <p className="inline">{product.format}</p>
            </span>
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <p className="text-sm">Quantity</p>
          <div className="flex items-center justify-start border border-gray-300 mt-0.5">
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
        </div>
        <button
          type="button"
          className="border border-gray-500 hover:border-gray-800 py-2 px-4 mt-2 w-full transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
export default ProductDetailPage
