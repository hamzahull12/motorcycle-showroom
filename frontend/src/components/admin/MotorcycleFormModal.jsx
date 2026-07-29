// src/components/admin/MotorcycleFormModal.jsx
import { useState, useEffect } from 'react';
import brandApi from '../../api/brand.api.js';

const INITIAL_FORM = {
  brand_id: '',
  title: '',
  category: 'Automatic',
  engine_stroke: '4-Stroke',
  transmission: 'Automatic',
  engine_capacity_cc: 150,
  color: '',
  year: new Date().getFullYear(),
  mileage_km: 0,
  price: 0,
  tax_expired_at: '',
  status: 'available',
  location: '',
  description: '',
};

const MotorcycleFormModal = ({ isOpen, onClose, onSubmit, initialData, loading }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchBrands();
      if (initialData) {
        setFormData({
          brand_id: initialData.brand?.id || initialData.brand_id || '',
          title: initialData.title || '',
          category: initialData.category || 'Automatic',
          engine_stroke: initialData.engine_stroke || '4-Stroke',
          transmission: initialData.transmission || 'Automatic',
          engine_capacity_cc: initialData.engine_capacity_cc || 150,
          color: initialData.color || '',
          year: initialData.year || new Date().getFullYear(),
          mileage_km: initialData.mileage_km || 0,
          price: initialData.price || 0,
          tax_expired_at: initialData.tax_expired_at
            ? new Date(initialData.tax_expired_at).toISOString().split('T')[0]
            : '',
          status: initialData.status || 'available',
          location: initialData.location || '',
          description: initialData.description || '',
        });
      } else {
        setFormData(INITIAL_FORM);
      }
    }
  }, [isOpen, initialData]);

  const fetchBrands = async () => {
    try {
      const res = await brandApi.getAll();
      setBrands(res.data || []);
    } catch (err) {
      console.error('Gagal mengambil daftar brand:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-950">
            {initialData ? 'Edit Data Motor' : 'Tambah Motor Baru'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Judul Motor</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="misal: Honda Vario 160 ABS 2023"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Brand</label>
              <select
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              >
                <option value="">Pilih Brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Kategori</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Automatic / Manual / Sport"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Warna</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="misal: Hitam Doff"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tahun</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Kapasitas Mesin (CC)</label>
              <input
                type="number"
                name="engine_capacity_cc"
                value={formData.engine_capacity_cc}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Transmisi</label>
              <input
                type="text"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Siklus Mesin</label>
              <input
                type="text"
                name="engine_stroke"
                value={formData.engine_stroke}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Jarak Tempuh (KM)</label>
              <input
                type="number"
                name="mileage_km"
                value={formData.mileage_km}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Harga (Rp)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Masa Berlaku Pajak</label>
              <input
                type="date"
                name="tax_expired_at"
                value={formData.tax_expired_at}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Status Motor</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Lokasi</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="misal: Jakarta Selatan"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-950"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Kondisi fisik, kelengkapan surat, dll."
              className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-gray-950"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-gray-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? 'Sabar...' : initialData ? 'Simpan Perubahan' : 'Tambah Motor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MotorcycleFormModal;