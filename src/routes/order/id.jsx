import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import { useAuth } from '../../contexts/AuthContext'

const OrderProductItem = ({ product }) => {
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
          </div>
        </div>
      </td>
      <td className="border-b border-gray-300 py-4 md:w-[60px]">{product?.quantity}</td>
      <td className="border-b border-gray-300 py-4 text-right md:w-[120px]">
        ${Number(product?.price).toFixed(2)} CAD
      </td>
      <td className="border-b border-gray-300 py-4 text-right md:w-[120px]">
        ${Number(product?.total).toFixed(2)} CAD
      </td>
    </tr>
  )
}

const OrderDetailPage = () => {
  const params = useParams()
  const auth = useAuth()
  const [order, setOrder] = useState(null)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_SHOPPING_URL}/order/${params['order-id']}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setOrder(data?.order ?? [])
      })
  }, [])

  return (
    <div className="mt-12 flex flex-col">
      <Link to="/order" className="text-gray-800 text-sm mb-8 hover:underline">
        ← Back to Orders
      </Link>
      <h2 className="text-3xl font-bold">Order #{order?.id?.substring(0, 8).toUpperCase()}</h2>
      <p className="text-sm mt-1">
        Order placed on {moment(order?.createdAt).format('MMM D, YYYY')}
      </p>

      <div className="mt-12 flex flex-col md:flex-row md:items-start gap-12">
        <div className="w-full md:w-2/3 flex flex-col">
          <table className="text-left border-collapse">
            <thead>
              <tr>
                <th className="font-light text-sm border-b border-gray-300 pb-2">Product</th>
                <th className="font-light text-sm border-b border-gray-300 pb-2 md:w-[60px]">
                  Quantity
                </th>
                <th className="font-light text-sm border-b border-gray-300 pb-2 text-right md:w-[120px]">
                  Price
                </th>
                <th className="font-light text-sm border-b border-gray-300 pb-2 text-right md:w-[120px]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.products?.map((product) => (
                <OrderProductItem key={product?.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full md:w-1/3 bg-slate-200 flex flex-col p-8">
          <h3 className="text-2xl font-bold text-center">Summary</h3>
          <div className="flex flex-col gap-y-1 mt-8">
            <div className="flex items-center justify-between">
              <p>Subtotal</p>
              <p>${Number(order?.subtotal).toFixed(2)} CAD</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Taxes</p>
              <p>${Number(order?.tax).toFixed(2)} CAD</p>
            </div>
            <div className="flex items-center justify-between font-medium">
              <p>Total</p>
              <p>${Number(order?.total).toFixed(2)} CAD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderDetailPage
