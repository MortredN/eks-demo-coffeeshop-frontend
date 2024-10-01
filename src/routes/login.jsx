import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <form className="mt-12 flex flex-col items-center gap-12">
      <h1 className="text-3xl font-bold">Log in</h1>
      <div className="flex flex-col max-w-md mx-auto w-full gap-4">
        <input
          type="email"
          placeholder="Email"
          className="text-lg border-b border-gray-800 w-full py-2 focus-visible:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="text-lg border-b border-gray-800 w-full py-2 focus-visible:outline-none"
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          className="text-sm bg-gray-600 hover:bg-gray-800 text-white py-2 px-4 transition-colors"
        >
          Sign in
        </button>
        <Link to="/register" className="text-sm">
          Create a new account?
        </Link>
      </div>
    </form>
  )
}
export default LoginPage
