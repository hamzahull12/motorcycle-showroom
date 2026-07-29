import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import motorcycleApi from '../../api/motorcycle.api.js';
import MotorcycleCard from '../motorcycle/MotorcycleCard.jsx';

const FeaturedMotorcycles = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await motorcycleApi.getMotorcycles({
            limit: 4,
            status: 'available',
          });

        setMotorcycles(response.data);
      } catch (err) {
        console.error(
          'Failed to fetch featured motorcycles:',
          err,
        );

        setError('Gagal memuat data motor.');
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycles();
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Koleksi Terbaru
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Motor pilihan untukmu
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Lihat beberapa motor yang saat ini tersedia di showroom kami.
            </p>
          </div>

          <Link
            to="/catalog"
            className="text-sm font-semibold text-gray-900 hover:underline"
          >
            Lihat semua motor →
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[420px] animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-10 rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Data */}
        {!loading && !error && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {motorcycles.map((motorcycle) => (
              <MotorcycleCard
                key={motorcycle.id}
                motorcycle={motorcycle}
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          motorcycles.length === 0 && (
            <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
              <p className="text-sm text-gray-500">
                Belum ada motor yang tersedia.
              </p>
            </div>
          )}
      </div>
    </section>
  );
};

export default FeaturedMotorcycles;