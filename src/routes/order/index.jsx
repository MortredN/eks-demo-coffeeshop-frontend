import moment from 'moment'
import { Link } from 'react-router-dom'

const OrderItem = () => {
  return (
    <tr>
      <td className="border-b border-gray-300 py-4">
        <Link to="/order/1" className="bg-slate-700 text-white font-medium py-1 px-2 w-fit">
          #CS-00001
        </Link>
      </td>
      <td className="border-b border-gray-300 py-4">{moment().format('MMM D, YYYY')}</td>
      <td className="border-b border-gray-300 py-4 text-right md:w-[120px]">
        ${(100).toFixed(2)} CAD
      </td>
    </tr>
  )
}

const OrdersPage = () => {
  return (
    <div className="mt-12 flex flex-col">
      <h2 className="text-3xl font-bold">My Orders</h2>

      <div className="mt-12 flex flex-col md:flex-row md:items-start gap-12">
        <div className="w-full md:w-2/3 flex flex-col">
          <table className="text-left border-collapse">
            <tr>
              <th className="font-light text-sm border-b border-gray-300 pb-2">Order</th>
              <th className="font-light text-sm border-b border-gray-300 pb-2">Date</th>
              <th className="font-light text-sm border-b border-gray-300 pb-2 text-right md:w-[120px]">
                Total
              </th>
            </tr>
            <OrderItem />
            <OrderItem />
          </table>
        </div>

        <div className="w-full md:w-1/3 bg-slate-200 flex flex-col p-8">
          <h3 className="text-2xl font-bold text-center">Account Info</h3>
          <div className="flex flex-col gap-y-1 items-center mt-12">
            <p>Full Name</p>
            <p>email@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrdersPage
