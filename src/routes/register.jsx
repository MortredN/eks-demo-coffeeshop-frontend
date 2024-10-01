import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <form className="mt-12 flex flex-col items-center gap-12">
      <h1 className="text-3xl font-bold">Create an account</h1>
      <div className="flex flex-col max-w-md mx-auto w-full gap-4">
        <input
          placeholder="Full name"
          className="text-lg border-b border-gray-800 w-full py-2 focus-visible:outline-none"
        />
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
        <Link to="/login" className="text-sm">
          Already have an account?
        </Link>
      </div>
    </form>
  )
}
export default RegisterPage
