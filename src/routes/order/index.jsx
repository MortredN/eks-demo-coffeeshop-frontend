import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const OrderItem = ({ order }) => {
  return (
    <tr>
      <td className="border-b border-gray-300 py-4">
        <Link
          to={`/order/${order?.id}`}
          className="bg-slate-700 text-white font-medium py-1 px-2 w-fit"
        >
          #{order?.id?.substring(0, 8).toUpperCase()}
        </Link>
      </td>
      <td className="border-b border-gray-300 py-4">
        {moment(order?.createdAt).format('MMM D, YYYY')}
      </td>
      <td className="border-b border-gray-300 py-4 text-right md:w-[120px]">
        ${Number(order?.total).toFixed(2)} CAD
      </td>
    </tr>
  )
}

const OrdersPage = () => {
  const auth = useAuth()
  const [orders, setOrders] = useState([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_SHOPPING_URL}/order`, {
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
        setOrders(data?.orders ?? [])
      })
  }, [])

  return (
    <div className="mt-12 flex flex-col">
      <Link to="/" className="text-gray-800 text-sm mb-8 hover:underline">
        ← Back to Shop
      </Link>
      <h2 className="text-3xl font-bold">My Orders</h2>

      <div className="mt-12 flex flex-col md:flex-row md:items-start gap-12">
        <div className="w-full md:w-2/3 flex flex-col">
          <table className="text-left border-collapse">
            <thead>
              <tr>
                <th className="font-light text-sm border-b border-gray-300 pb-2">Order</th>
                <th className="font-light text-sm border-b border-gray-300 pb-2">Date</th>
                <th className="font-light text-sm border-b border-gray-300 pb-2 text-right md:w-[120px]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full md:w-1/3 bg-slate-200 flex flex-col p-8">
          <h3 className="text-2xl font-bold text-center">Account Info</h3>
          <div className="flex flex-col gap-y-1 items-center mt-12">
            <p>{auth?.user?.name}</p>
            <p>{auth?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrdersPage
