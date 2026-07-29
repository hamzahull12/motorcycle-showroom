import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

import MotorcycleCard from '../../components/motorcycle/MotorcycleCard.jsx';
import motorcycleApi from '../../api/motorcycle.api.js';

const CatalogPage = () => {
  // =========================
  // DATA
  // =========================
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [motorcycles, setMotorcycles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1,
  });

  // =========================
  // FILTER
  // =========================

  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('available');

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  // =========================
  // SORTING
  // =========================

  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  // =========================
  // UI STATE
  // =========================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // =========================
  // FETCH DATA
  // =========================

  const fetchMotorcycles = async ({
    page = 1,
    currentSearch = search,
    currentBrand = brand,
    currentCategory = category,
    currentStatus = status,
    currentMinPrice = minPrice,
    currentMaxPrice = maxPrice,
    currentMinYear = minYear,
    currentMaxYear = maxYear,
    currentSortBy = sortBy,
    currentSortOrder = sortOrder,
  } = {}) => {
    try {
      setLoading(true);
      setError('');

      const response =
        await motorcycleApi.getMotorcycles({
          page,
          limit: 6,

          search:
            currentSearch.trim() || undefined,

          brand:
            currentBrand || undefined,

          category:
            currentCategory || undefined,

          status:
            currentStatus || undefined,

          minPrice:
            currentMinPrice !== ''
              ? currentMinPrice
              : undefined,

          maxPrice:
            currentMaxPrice !== ''
              ? currentMaxPrice
              : undefined,

          minYear:
            currentMinYear !== ''
              ? currentMinYear
              : undefined,

          maxYear:
            currentMaxYear !== ''
              ? currentMaxYear
              : undefined,

          sortBy: currentSortBy,
          sortOrder: currentSortOrder,
        });

      setMotorcycles(response.data);

      setPagination(response.pagination);
    } catch (err) {
      console.error(
        'Failed to fetch motorcycles:',
        err,
      );

      setError(
        'Gagal memuat data motor. Silakan coba lagi.',
      );

      setMotorcycles([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL FETCH
  // =========================

  useEffect(() => {
    fetchMotorcycles();
  }, []);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = () => {
    fetchMotorcycles({
      page: 1,
    });
  };

  // =========================
  // APPLY FILTER
  // =========================

  const handleApplyFilter = () => {
    fetchMotorcycles({
      page: 1,
    });
  };

  // =========================
  // RESET FILTER
  // =========================

  const handleResetFilter = () => {
    const defaultValues = {
      search: '',
      brand: '',
      category: '',
      status: 'available',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      sortBy: 'created_at',
      sortOrder: 'desc',
    };

    setSearch(defaultValues.search);
    setBrand(defaultValues.brand);
    setCategory(defaultValues.category);
    setStatus(defaultValues.status);

    setMinPrice(defaultValues.minPrice);
    setMaxPrice(defaultValues.maxPrice);

    setMinYear(defaultValues.minYear);
    setMaxYear(defaultValues.maxYear);

    setSortBy(defaultValues.sortBy);
    setSortOrder(defaultValues.sortOrder);

    fetchMotorcycles({
      page: 1,

      currentSearch: defaultValues.search,
      currentBrand: defaultValues.brand,
      currentCategory: defaultValues.category,
      currentStatus: defaultValues.status,

      currentMinPrice:
        defaultValues.minPrice,

      currentMaxPrice:
        defaultValues.maxPrice,

      currentMinYear:
        defaultValues.minYear,

      currentMaxYear:
        defaultValues.maxYear,

      currentSortBy:
        defaultValues.sortBy,

      currentSortOrder:
        defaultValues.sortOrder,
    });
  };

  // =========================
  // PAGINATION
  // =========================

  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > pagination.totalPages ||
      page === pagination.page
    ) {
      return;
    }

    fetchMotorcycles({
      page,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // =========================
  // SORT
  // =========================

  const handleSortChange = (event) => {
    const value = event.target.value;

    let newSortBy = 'created_at';
    let newSortOrder = 'desc';

    switch (value) {
      case 'price_asc':
        newSortBy = 'price';
        newSortOrder = 'asc';
        break;

      case 'price_desc':
        newSortBy = 'price';
        newSortOrder = 'desc';
        break;

      case 'year_desc':
        newSortBy = 'year';
        newSortOrder = 'desc';
        break;

      case 'year_asc':
        newSortBy = 'year';
        newSortOrder = 'asc';
        break;

      case 'mileage_asc':
        newSortBy = 'mileage';
        newSortOrder = 'asc';
        break;

      case 'mileage_desc':
        newSortBy = 'mileage';
        newSortOrder = 'desc';
        break;

      case 'newest':
      default:
        newSortBy = 'created_at';
        newSortOrder = 'desc';
        break;
    }

    setSortBy(newSortBy);
    setSortOrder(newSortOrder);

    fetchMotorcycles({
      page: 1,
      currentSortBy: newSortBy,
      currentSortOrder: newSortOrder,
    });
  };

  // =========================
  // RENDER
  // =========================

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Motorcycle Showroom
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Koleksi Motor
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Temukan motor yang sesuai dengan
            kebutuhan dan budget kamu.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder="Cari motor atau brand..."
              className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-gray-900"
            />
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="h-11 rounded-lg bg-gray-950 px-6 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Cari
          </button>
        </div>

        {/* Filter */}
        <div className="mt-2 rounded-2xl border border-gray-200 bg-white p-2">

          {/* Filter Button */}
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            <SlidersHorizontal size={17} />

            <span>
              {isFilterOpen ? 'Filter' : 'Filter'}
            </span>
          </button>

          {/* Filter Content */}
          {isFilterOpen && (
            <>
              {/* Brand, Category, Status, Sort */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {/* Brand */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Brand
                  </label>

                  <select
                    value={brand}
                    onChange={(event) =>
                      setBrand(event.target.value)
                    }
                    className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-900"
                  >
                    <option value="">Semua brand</option>
                    <option value="honda">Honda</option>
                    <option value="yamaha">Yamaha</option>
                    <option value="suzuki">Suzuki</option>
                    <option value="kawasaki">Kawasaki</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Kategori
                  </label>

                  <select
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-900"
                  >
                    <option value="">Semua kategori</option>
                    <option value="matic">Matic</option>
                    <option value="sport">Sport</option>
                    <option value="bebek">Bebek</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value)
                    }
                    className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-900"
                  >
                    <option value="">Semua status</option>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Urutkan
                  </label>

                  <select
                    value={`${sortBy}_${sortOrder}`}
                    onChange={handleSortChange}
                    className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-900"
                  >
                    <option value="created_at_desc">
                      Terbaru
                    </option>

                    <option value="price_asc">
                      Harga terendah
                    </option>

                    <option value="price_desc">
                      Harga tertinggi
                    </option>

                    <option value="year_desc">
                      Tahun terbaru
                    </option>

                    <option value="year_asc">
                      Tahun terlama
                    </option>

                    <option value="mileage_asc">
                      Kilometer terendah
                    </option>

                    <option value="mileage_desc">
                      Kilometer tertinggi
                    </option>
                  </select>
                </div>
              </div>

              {/* Price & Year */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                {/* Price */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Harga
                  </label>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(event) =>
                        setMinPrice(event.target.value)
                      }
                      placeholder="Minimum"
                      min="0"
                      className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-900"
                    />

                    <span className="text-gray-400">—</span>

                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(event) =>
                        setMaxPrice(event.target.value)
                      }
                      placeholder="Maksimum"
                      min="0"
                      className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-900"
                    />
                  </div>
                </div>

                {/* Year */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tahun
                  </label>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minYear}
                      onChange={(event) =>
                        setMinYear(event.target.value)
                      }
                      placeholder="Minimum"
                      min="1900"
                      max="2100"
                      className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-900"
                    />

                    <span className="text-gray-400">—</span>

                    <input
                      type="number"
                      value={maxYear}
                      onChange={(event) =>
                        setMaxYear(event.target.value)
                      }
                      placeholder="Maksimum"
                      min="1900"
                      max="2100"
                      className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="mt-5 flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={handleApplyFilter}
                  disabled={loading}
                  className="rounded-lg bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Memuat...' : 'Terapkan Filter'}
                </button>

                <button
                  type="button"
                  onClick={handleResetFilter}
                  disabled={loading}
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reset
                </button>

              </div>
            </>
          )}

        </div>

        {/* Result Header */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Menampilkan{' '}
              <span className="font-semibold text-gray-900">
                {pagination.total}
              </span>{' '}
              motor
            </p>
          </div>

          {pagination.totalPages > 1 && (
            <p className="text-sm text-gray-500">
              Halaman {pagination.page} dari{' '}
              {pagination.totalPages}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                  <div className="aspect-[4/3] animate-pulse bg-gray-200" />

                  <div className="space-y-3 p-5">
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

                    <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

                    <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ),
            )}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          motorcycles.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <h3 className="text-lg font-bold text-gray-900">
                Motor tidak ditemukan
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Coba ubah filter atau kata pencarian
                kamu.
              </p>

              <button
                type="button"
                onClick={handleResetFilter}
                className="mt-5 rounded-lg bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Reset Filter
              </button>
            </div>
          )}

        {/* Motorcycle Grid */}
        {!loading &&
          !error &&
          motorcycles.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {motorcycles.map((motorcycle) => (
                <MotorcycleCard
                  key={motorcycle.id}
                  motorcycle={motorcycle}
                />
              ))}
            </div>
          )}

        {/* Pagination */}
        {!loading &&
          !error &&
          pagination.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={pagination.page === 1}
                onClick={() =>
                  handlePageChange(
                    pagination.page - 1,
                  )
                }
                className="inline-flex h-10 items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Sebelumnya
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  {
                    length: pagination.totalPages,
                  },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      handlePageChange(page)
                    }
                    className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold transition ${page === pagination.page
                      ? 'bg-gray-950 text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={
                  pagination.page ===
                  pagination.totalPages
                }
                onClick={() =>
                  handlePageChange(
                    pagination.page + 1,
                  )
                }
                className="inline-flex h-10 items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Berikutnya
                <ChevronRight size={16} />
              </button>
            </div>
          )}
      </section>
    </main>
  );
};

export default CatalogPage;