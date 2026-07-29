// src/components/admin/ImageManagerModal.jsx
import React, { useState, useEffect } from 'react';
import {
  getImagesByMotorcycleId,
  createImage,
  updateImage,
  deleteImage
} from '../../api/motorcycle-image.api.js';

export default function ImageManagerModal({ isOpen, onClose, motorcycle }) {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && motorcycle?.id) {
      fetchImages();
    }
  }, [isOpen, motorcycle]);

  const fetchImages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getImagesByMotorcycleId(motorcycle.id);
      setImages(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat gambar');
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    setLoading(true);
    setError('');
    try {
      await createImage(motorcycle.id, {
        imageUrl: imageUrl.trim(),
        isPrimary: images.length === 0, // Jika gambar pertama, otomatis set primary
        sortOrder: images.length
      });
      setImageUrl('');
      await fetchImages();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambahkan gambar');
    } finally {
      setLoading(false);
    }
  };

  const handleSetPrimary = async (imageId) => {
    setLoading(true);
    try {
      await updateImage(imageId, { isPrimary: true });
      await fetchImages();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengubah gambar utama');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Yakin ingin menghapus gambar ini?')) return;

    setLoading(true);
    try {
      await deleteImage(imageId);
      await fetchImages();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus gambar');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-bold text-gray-800">
            Kelola Gambar: <span className="text-emerald-600">{motorcycle?.title}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-xl"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form Tambah Gambar (URL) */}
        <form onSubmit={handleAddImage} className="mt-4 flex gap-2">
          <input
            type="url"
            placeholder="Masukkan URL Gambar (https://...)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : '+ Tambah URL'}
          </button>
        </form>

        {/* List Gambar */}
        <div className="mt-6 max-h-96 overflow-y-auto">
          {loading && images.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-8">Memuat gambar...</p>
          ) : images.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">Belum ada gambar untuk unit ini.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {images.map((img) => (
                <div key={img.id} className="relative group rounded-lg border bg-gray-50 p-2 overflow-hidden">
                  <img
                    src={img.image_url}
                    alt="Motorcycle"
                    className="h-32 w-full object-cover rounded-md"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image+URL';
                    }}
                  />

                  {/* Badge Status Primary */}
                  {img.is_primary ? (
                    <span className="absolute top-3 left-3 rounded-md bg-emerald-600 px-2 py-0.5 text-xs text-white shadow">
                      Utama
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetPrimary(img.id)}
                      className="absolute top-3 left-3 hidden group-hover:block rounded-md bg-black/70 px-2 py-0.5 text-xs text-white hover:bg-emerald-600"
                    >
                      Set Utama
                    </button>
                  )}

                  {/* Tombol Hapus */}
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="absolute top-3 right-3 rounded-full bg-red-600 p-1 text-white opacity-90 hover:opacity-100"
                    title="Hapus Gambar"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}