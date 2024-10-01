import { Link } from 'react-router-dom'

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

const ProductCard = () => {
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
            <h2 className="text-sm font-medium">{product.name}</h2>
          </Link>
          <div className="w-full h-px bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity -mt-0.5" />
        </div>
        <h3 className="mt-1">${product.price.toFixed(2)} CAD</h3>
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
        className="text-sm border border-gray-300 hover:border-gray-500 py-1 px-2 mt-2 transition-colors"
      >
        Quick Add
      </button>
    </div>
  )
}
export default ProductCard
