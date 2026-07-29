// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect, useCallback } from 'react';
import motorcycleApi from '../../api/motorcycle.api.js';
import MotorcycleFormModal from '../../components/admin/MotorcycleFormModal.jsx';
import { ImageIcon, Pencil, Trash2 } from 'lucide-react';
import ImageManagerModal from '../../components/admin/ImageManagerModal.jsx';

const AdminDashboard = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State Modal Form (Create / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMotor, setSelectedMotor] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [selectedMotorcycle, setSelectedMotorcycle] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const fetchMotorcycles = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await motorcycleApi.getMotorcycles({
        page: pagination.page,
        limit: pagination.limit,
        search,
      });

      setMotorcycles(res.data || []);
      if (res.pagination) {
        setPagination((prev) => ({
          ...prev,
          totalPages: res.pagination.totalPages,
          total: res.pagination.total,
        }));
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Gagal memuat data motor.');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search]);

  useEffect(() => {
    fetchMotorcycles();
  }, [fetchMotorcycles]);

  const handleOpenCreateModal = () => {
    setSelectedMotor(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (motor) => {
    setSelectedMotor(motor);
    setIsModalOpen(true);
  };

  const handleOpenImageModal = (motorcycle) => {
    setSelectedMotorcycle(motorcycle);
    setIsImageModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitLoading(true);
      if (selectedMotor) {
        await motorcycleApi.update(selectedMotor.id, formData);
      } else {
        await motorcycleApi.create(formData);
      }
      setIsModalOpen(false);
      fetchMotorcycles();
    } catch (err) {
      console.error('Submit error:', err);
      alert(err.response?.data?.message || 'Terjadi kesalahan saat menyimpan data.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${title}"?`)) {
      try {
        await motorcycleApi.remove(id);
        fetchMotorcycles();
      } catch (err) {
        console.error('Delete error:', err);
        alert('Gagal menghapus data motor.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-950">Manajemen Inventaris Motor</h1>
            <p className="mt-1 text-sm text-gray-500">Kelola unit motor showroom kamu di sini.</p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="rounded-lg bg-gray-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            + Tambah Motor
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 rounded-xl bg-white p-4 shadow-sm border border-gray-200">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination((prev) => ({ ...prev, page: 1 }));
            }}
            placeholder="Cari berdasarkan judul atau brand..."
            className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-950"
          />
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        {/* Data Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-100 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-3">Unit</th>
                  <th className="px-6 py-3">Brand</th>
                  <th className="px-6 py-3">Tahun</th>
                  <th className="px-6 py-3">Harga</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      Memuat data...
                    </td>
                  </tr>
                ) : motorcycles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      Tidak ada data motor ditemukan.
                    </td>
                  </tr>
                ) : (
                  motorcycles.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {m.title}
                      </td>
                      <td className="px-6 py-4">{m.brand?.name || '-'}</td>
                      <td className="px-6 py-4">{m.year}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        Rp {m.price?.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${m.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : m.status === 'sold'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Tombol Gambar */}
                          <button
                            onClick={() => handleOpenImageModal(m)} // Passing seluruh object motor
                            title="Kelola Gambar"
                            className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 transition"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </button>

                          {/* Tombol Edit */}
                          <button
                            onClick={() => handleOpenEditModal(m)}
                            title="Edit Data"
                            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 transition"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          {/* Tombol Hapus */}
                          <button
                            onClick={() => handleDelete(m.id, m.title)}
                            title="Hapus Unit"
                            className="rounded-lg p-2 text-red-600 hover:bg-red-50 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3 bg-white">
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold">{pagination.total}</span> unit motor
            </p>
            <div className="flex gap-2">
              <button
                disabled={pagination.page <= 1}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                className="rounded border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
              >
                Prev
              </button>
              <span className="flex items-center text-sm font-medium text-gray-700">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                className="rounded border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Form Modal */}
      <MotorcycleFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedMotor}
        loading={submitLoading}
      />
      <ImageManagerModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        motorcycle={selectedMotorcycle}
      />
    </div>
  );
};

export default AdminDashboard;