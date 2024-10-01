import moment from 'moment'

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

const OrderProductItem = () => {
  return (
    <tr>
      <td className="border-b border-gray-300 py-4">
        <div className="flex items-center gap-x-4">
          <img src={product.image} className="size-20 rounded-lg object-cover" />
          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-600">{product.brand}</p>
            <p className="font-medium">{product.name}</p>
          </div>
        </div>
      </td>
      <td className="border-b border-gray-300 py-4 md:w-[60px]">1</td>
      <td className="border-b border-gray-300 py-4 text-right md:w-[120px]">
        ${product.price.toFixed(2)} CAD
      </td>
      <td className="border-b border-gray-300 py-4 text-right md:w-[120px]">
        ${product.price.toFixed(2)} CAD
      </td>
    </tr>
  )
}

const OrderDetailPage = () => {
  return (
    <div className="mt-12 flex flex-col">
      <h2 className="text-3xl font-bold">Order #CS-00001</h2>
      <p className='text-sm mt-1'>Order placed on {moment().format('MMM D, YYYY')}</p>

      <div className="mt-12 flex flex-col md:flex-row md:items-start gap-12">
        <div className="w-full md:w-2/3 flex flex-col">
          <table className="text-left border-collapse">
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
            <OrderProductItem />
            <OrderProductItem />
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
        </div>
      </div>
    </div>
  )
}
export default OrderDetailPage
