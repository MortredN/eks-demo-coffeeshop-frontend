import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout'
import ErrorPage from './routes/error'
import HomePage from './routes/home'
import LoginPage from './routes/login'
import RegisterPage from './routes/register'
import CartPage from './routes/cart'
import ProductDetailPage from './routes/product/subname'
import OrdersPage from './routes/order'
import OrderDetailPage from './routes/order/id'

// TODO: Handle auth redirect
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: (
      <RootLayout>
        <ErrorPage />
      </RootLayout>
    ),
    children: [
      { path: '', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/product/:product-subname', element: <ProductDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/order', element: <OrdersPage /> },
      { path: '/order/:order-id', element: <OrderDetailPage /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
