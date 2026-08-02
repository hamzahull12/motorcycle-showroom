import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotorcycleCard = ({ motorcycle }) => {
  const {
    title,
    id,
    category,
    year,
    price,
    status,
    brand,
    primary_image,
  } = motorcycle;

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {primary_image?.image_url ? (
          <img
            src={primary_image.image_url}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}

        {/* Status */}
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-gray-900 shadow-sm">
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {brand?.name} · {category}
        </p>

        <h3 className="mt-2 line-clamp-2 text-lg font-bold text-gray-900">
          {title}
        </h3>

        <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
          <span>{year}</span>

          <span className="h-1 w-1 rounded-full bg-gray-300" />
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">
              Harga
            </p>

            <p className="mt-1 text-lg font-bold text-gray-900">
              {formattedPrice}
            </p>
          </div>

          <Link
            to={`/catalog/${id}`}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
          >
            Detail
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default MotorcycleCard;