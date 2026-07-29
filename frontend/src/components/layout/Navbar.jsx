import {
  Menu,
  X,
  User,
  LogOut,
  LogIn,
} from 'lucide-react';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();

  const accessToken = localStorage.getItem(
    'accessToken',
  );

  const isLoggedIn = Boolean(accessToken);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setShowProfileMenu(false);
    setIsOpen(false);

    navigate('/', {
      replace: true,
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          MOJOMOTOR
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-gray-900 transition hover:text-gray-600"
          >
            Home
          </Link>

          <Link
            to="/catalog"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Catalog
          </Link>

          {/* Authentication */}
          {isLoggedIn ? (
            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setShowProfileMenu(
                    (prev) => !prev,
                  )
                }
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white">
                  <User size={16} />
                </div>

                <span>Admin</span>
              </button>

              {/* Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">

                  <div className="border-b border-gray-100 px-3 py-2">
                    <p className="text-xs font-semibold text-gray-900">
                      Admin
                    </p>

                    <p className="text-xs text-gray-500">
                      Admin Showroom
                    </p>
                  </div>

                  <Link
                    to="/admin"
                    onClick={() =>
                      setShowProfileMenu(false)
                    }
                    className="mt-1 block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <LogIn size={16} />
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() =>
            setIsOpen((prev) => !prev)
          }
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">

          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-900"
            >
              Home
            </Link>

            <Link
              to="/catalog"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-600"
            >
              Catalog
            </Link>

            <hr className="border-gray-100" />

            {/* Mobile Authentication */}
            {isLoggedIn ? (
              <div className="flex flex-col gap-3">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white">
                    <User size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Admin
                    </p>

                    <p className="text-xs text-gray-500">
                      Admin Showroom
                    </p>
                  </div>

                </div>

                <Link
                  to="/admin"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="flex w-full items-center justify-center rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </div>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <LogIn size={16} />
                Login
              </Link>
            )}

          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;