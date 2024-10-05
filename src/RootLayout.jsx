import { Outlet } from 'react-router-dom'
import Header from './components/Header'

const Root = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-8">{children ?? <Outlet />}</div>
    </div>
  )
}
export default Root
