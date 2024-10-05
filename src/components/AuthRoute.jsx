import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AuthRoute = () => {
  const user = useAuth()
  if (user.token) return <Navigate to="/" />
  return <Outlet />
}

export default AuthRoute
