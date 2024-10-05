import { Link } from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext'

const ProductCard = ({ product }) => {
  const cartContext = useCartContext()

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center group">
        <Link
          to={`/product/${product.subname}`}
          className="w-full aspect-square group-hover:scale-105 transition-transform duration-300"
        >
          <img src={product.image} className="size-full object-cover rounded-lg" />
        </Link>
        <p className="text-xs text-gray-600 mt-2.5">{product.brand}</p>
        <div className="flex flex-col mx-auto">
          <Link to={`/product/${product.subname}`} className="mt-0.5">
            <h2 className=" text-center font-medium group-hover:underline">{product.name}</h2>
          </Link>
        </div>
        <h3 className="mt-1">${Number(product.price).toFixed(2)} CAD</h3>
        <span className="text-xs mt-1">
          <b className="font-medium inline">Quantity: </b>
          <p className="inline">{product.quantity}</p>
          {' / '}
          <b className="font-medium inline">Format: </b>
          <p className="inline">{product.format}</p>
        </span>
      </div>
      <button
        type="button"
        onClick={() => cartContext.onAddToCart(product)}
        className="text-sm border border-gray-300 hover:border-gray-500 py-1 px-2 mt-2 transition-colors"
      >
        Quick Add
      </button>
    </div>
  )
}
export default ProductCard
