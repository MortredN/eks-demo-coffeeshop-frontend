import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_SHOPPING_URL}/product`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setProducts(data?.products ?? [])
      })
  }, [])

  return (
    <div className="mt-12 grid md:grid-cols-5 gap-8 md:gap-12">
      {products?.map((product) => (
        <ProductCard key={product?.id} product={product} />
      ))}
    </div>
  )
}
export default HomePage
