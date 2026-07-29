import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import authApi from '../../api/auth.api.js';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const accessToken = localStorage.getItem(
    'accessToken',
  );

  if (accessToken) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    try {
      setLoading(true);

      const response = await authApi.login({
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/admin');
    } catch (err) {
      console.error(
        'Admin login failed',
        err,
      );

      setError(
        err.response?.data?.message || 'Email atau password salah.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-950 px-4'>
      <div className='w-full max-w-md'>
        <div className='rounded-2xl bg-white p-8 shadow-xl'>
          <div className='mb-8'>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Admin Panel
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
              Login
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Masuk untuk mengelola inventory motor.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="admin@showroom.test"
                autoComplete="email"
                required
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-gray-950 focus:ring-1 focus:ring-gray-950"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Masukkan password"
                autoComplete="current-password"
                required
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-gray-950 focus:ring-1 focus:ring-gray-950"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-gray-950 px-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? 'Memproses...'
                : 'Masuk'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;