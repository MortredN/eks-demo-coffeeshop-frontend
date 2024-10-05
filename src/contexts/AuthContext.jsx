import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('coffeeshop_site') || '')
  const navigate = useNavigate()

  useEffect(() => {
    if (!_.isEmpty(token)) {
      fetch(`${import.meta.env.VITE_API_CUSTOMER_URL}/me/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          setUser(data?.customer ?? null)
        })
    }
  }, [token])

  const onRegister = async (data, navigateToHome = true) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_CUSTOMER_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.customer && res.accessToken) {
        setUser(res.customer)
        setToken(res.accessToken)
        localStorage.setItem('coffeeshop_site', res.accessToken)
        if (navigateToHome) {
          navigate('/')
        }
        return
      } else alert(res.message)
    } catch (err) {
      console.error(err)
    }
  }

  const onLogin = async (data, navigateToHome = true) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_CUSTOMER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.customer && res.accessToken) {
        setUser(res.customer)
        setToken(res.accessToken)
        localStorage.setItem('coffeeshop_site', res.accessToken)
        if (navigateToHome) {
          navigate('/')
        }
        return
      } else alert(res.message)
    } catch (err) {
      console.error(err)
    }
  }

  const onLogout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('coffeeshop_site')
    navigate('/login')
  }

  const value = {
    user,
    setUser,
    token,
    setToken,
    onRegister,
    onLogin,
    onLogout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthProvider
