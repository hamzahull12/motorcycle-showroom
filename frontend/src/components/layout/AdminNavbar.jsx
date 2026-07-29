// src/components/layout/AdminNavbar.jsx
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/auth.api.js';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authApi.logout();
    // Redirect ke halaman login setelah token dibersihkan
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-bold tracking-wider text-gray-950 uppercase">
            Admin Panel
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Tombol ke Dashboard / Halaman Publik */}
          <button
            onClick={() => navigate('/')} // Sesuaikan '/' dengan path publik kamu (misal: '/showroom')
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95"
            title="Lihat Tampilan Publik"
          >
            {/* SVG Icon External Link / Eye */}
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span>Lihat Website</span>
          </button>

          {/* Tombol Logout */}
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;