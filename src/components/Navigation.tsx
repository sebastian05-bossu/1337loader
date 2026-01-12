import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, LayoutDashboard, Shield, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group" onClick={closeMobileMenu}>
            <img
              src="/logo1337.png"
              alt="1337 Logo"
              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 rounded-full"
            />
            <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hidden sm:inline">
              1337SERVICES
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`relative text-sm font-medium transition-colors duration-300 ${
                isActive('/') ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              HOME
              {isActive('/') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
              )}
            </Link>
            <Link
              to="/features"
              className={`relative text-sm font-medium transition-colors duration-300 ${
                isActive('/features') ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              FEATURES
              {isActive('/features') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
              )}
            </Link>
            <Link
              to="/buy"
              className={`relative text-sm font-medium transition-colors duration-300 ${
                isActive('/buy') ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              BUY
              {isActive('/buy') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
              )}
            </Link>

            <div className="h-6 w-px bg-gray-700" />

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    isActive('/dashboard')
                      ? 'text-cyan-400 bg-cyan-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <LayoutDashboard size={16} />
                  <span className="text-sm font-medium">DASHBOARD</span>
                </Link>
                {user && (
                  <Link
                    to="/admin"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      isActive('/admin')
                        ? 'text-purple-400 bg-purple-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Shield size={16} />
                    <span className="text-sm font-medium">ADMIN</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
                >
                  <LogOut size={16} />
                  <span className="text-sm font-medium">LOGOUT</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
                >
                  REGISTER
                </Link>
              </>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cyan-500/20 mt-4 pt-4 pb-4 space-y-3">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive('/') ? 'text-cyan-400 bg-cyan-500/20' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              HOME
            </Link>
            <Link
              to="/features"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive('/features') ? 'text-cyan-400 bg-cyan-500/20' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              FEATURES
            </Link>
            <Link
              to="/buy"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive('/buy') ? 'text-cyan-400 bg-cyan-500/20' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              BUY
            </Link>

            <div className="h-px bg-gray-700" />

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive('/dashboard')
                      ? 'text-cyan-400 bg-cyan-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <LayoutDashboard size={16} />
                  <span className="text-sm font-medium">DASHBOARD</span>
                </Link>
                <Link
                  to="/admin"
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive('/admin')
                      ? 'text-purple-400 bg-purple-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Shield size={16} />
                  <span className="text-sm font-medium">ADMIN</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                  <LogOut size={16} />
                  <span className="text-sm font-medium">LOGOUT</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-center"
                >
                  REGISTER
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
