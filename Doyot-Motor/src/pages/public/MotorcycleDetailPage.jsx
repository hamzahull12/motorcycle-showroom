import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, MapPin, MessageCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import motorcycleApi from '../../api/motorcycle.api.js';

const MotorcycleDetailPage = () => {
  const { id } = useParams();

  const [motorcycle, setMotorcycle] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMotorcycle = async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await motorcycleApi.getMotorcycleById(id);

        setMotorcycle(response);

        const primaryImage =
          response.images?.find(
            (image) => image.is_primary,
          );

        setActiveImage(
          primaryImage?.image_url ||
          response.images?.[0]?.image_url ||
          null,
        );
      } catch (err) {
        console.error(err);

        setError(
          'Motor tidak ditemukan atau gagal dimuat.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycle();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="h-[500px] animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </main>
    );
  }

  if (error || !motorcycle) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Motor tidak ditemukan
          </h1>

          <p className="mt-2 text-gray-500">
            Data motor yang kamu cari tidak tersedia.
          </p>

          <Link
            to="/catalog"
            className="mt-6 inline-flex rounded-lg bg-gray-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Kembali ke catalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-950"
        >
          <ArrowLeft size={17} />
          Kembali ke catalog
        </Link>

        {/* Main */}
        <div className="mt-8 grid gap-10 lg:grid-cols-2">

          {/* Gallery */}
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={motorcycle.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {motorcycle.images?.length > 0 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {motorcycle.images.map((image) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() =>
                      setActiveImage(image.image_url)
                    }
                    className={`aspect-square overflow-hidden rounded-lg border-2 ${activeImage === image.image_url
                      ? 'border-gray-950'
                      : 'border-transparent'
                      }`}
                  >
                    <img
                      src={image.image_url}
                      alt={motorcycle.title}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Information */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-500">
              <span>
                {motorcycle.brand?.name}
              </span>

              <span>·</span>

              <span>{motorcycle.category}</span>
            </div>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
              {motorcycle.title}
            </h1>

            <div className="mt-5">
              <p className="text-sm text-gray-500">
                Harga
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-950">
                Rp {Number(motorcycle.price).toLocaleString('id-ID')}
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/6285770528852?text=${encodeURIComponent(
                `Halo, saya tertarik dengan ${motorcycle.title} dengan harga Rp ${Number(
                  motorcycle.price,
                ).toLocaleString('id-ID')}. Apakah unit ini masih tersedia?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <MessageCircle size={19} />
              Chat via WhatsApp
            </a>

            {/* Quick specs */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <Calendar
                  size={18}
                  className="text-gray-500"
                />

                <p className="mt-3 text-xs text-gray-500">
                  Tahun
                </p>

                <p className="mt-1 font-semibold">
                  {motorcycle.year}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <MapPin
                  size={18}
                  className="text-gray-500"
                />

                <p className="mt-3 text-xs text-gray-500">
                  Lokasi
                </p>

                <p className="mt-1 font-semibold">
                  {motorcycle.location}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500">
                  Status
                </p>

                <p className="mt-2 font-semibold capitalize">
                  {motorcycle.status}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-gray-500 pt-8">
              <h2 className="text-lg font-bold">
                Deskripsi
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {motorcycle.description}
              </p>
            </div>
          </div>
        </div>

        Specifications
        {/* <section className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold">
            Spesifikasi
          </h2>

          <div className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            <Specification
              label="Brand"
              value={motorcycle.brand?.name}
            />

            <Specification
              label="Kategori"
              value={motorcycle.category}
            />

            <Specification
              label="Kapasitas Mesin"
              value={`${motorcycle.engine_capacity_cc} cc`}
            />

            <Specification
              label="Transmisi"
              value={motorcycle.transmission}
            />

            <Specification
              label="Engine Stroke"
              value={motorcycle.engine_stroke}
            />

            <Specification
              label="Warna"
              value={motorcycle.color}
            />

            <Specification
              label="Tahun"
              value={motorcycle.year}
            />

            <Specification
              label="Kilometer"
              value={`${Number(
                motorcycle.mileage_km,
              ).toLocaleString('id-ID')} km`}
            />
          </div>
        </section> */}
      </div>
    </main>
  );
};

// const Specification = ({
//   label,
//   value,
// }) => {
//   return (
//     <div className="border-b border-gray-200 pb-4">
//       <p className="text-sm text-gray-500">
//         {label}
//       </p>

//       <p className="mt-1 font-semibold capitalize text-gray-900">
//         {value || '-'}
//       </p>
//     </div>
//   );
// };

export default MotorcycleDetailPage;