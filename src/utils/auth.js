import { redirect } from 'react-router-dom'

export const checkAuthRoute = async () => {
  const token = localStorage.getItem('coffeeshop_site')
  if (token) throw redirect('/')
  return null
}

export const checkPrivateRoute = async () => {
  const token = localStorage.getItem('coffeeshop_site')
  if (!token) throw redirect('/login')
  return null
}
