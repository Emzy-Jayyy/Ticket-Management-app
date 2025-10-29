// components/NavBar.jsx (use react-router-dom Links)
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Ticket, LogOut } from 'lucide-react'

const NavBar = ({ mobileOpen, setMobileOpen, isAuthenticated, user, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Ticket className="text-indigo-600" size={28} />
            <Link to="/" className="text-xl font-bold">TicketFlow</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-indigo-600">Login</Link>
                <Link to="/signup" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Get Started</Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hi, {user?.name}!</span>
                <button onClick={onLogout} className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(p => !p)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 space-y-2">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="block w-full text-left px-4 py-2 hover:bg-gray-50">Login</Link>
                <Link to="/signup" className="block w-full text-left px-4 py-2 hover:bg-gray-50">Get Started</Link>
              </>
            ) : (
              <button onClick={onLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Logout</button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
