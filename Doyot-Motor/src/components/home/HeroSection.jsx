import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const bgImageUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBc0zfV3TbXQY_jDADK7LpfOvaFsWMPDxvbFbDGYE0xctiL4F5HcOjNy10Xj-E2W3fE1EyAQI9Vz50rmoOsIluM23J-1QXb5q5cgbabuQcOtTgog6PZ8A8zoZkMzuM3-bC4PguI1ZQ1nEqh9YFryXEZ7SDOZsaZK7OwS9PA-b-mz0m6kMzRPT0mI5X_UC0HLpsRyii3w9O0oNHTkV5o17wSNoognAKKWMnL2M3VCBdhu8G3PpKUjwWNkQ';

  return (
    <section className="relative overflow-hidden bg-gray-950 text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImageUrl}
          alt="Motorcycle Background"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-gray-950/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto min-h-[560px] max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Motorcycle Showroom
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Temukan motor yang tepat untuk perjalananmu.
          </h1>

          <p className="mt-6 text-base leading-7 text-gray-300 sm:text-lg">
            Jelajahi koleksi motor berkualitas dengan informasi lengkap,
            transparan, dan mudah dibandingkan.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/* Lihat Koleksi */}
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-200"
            >
              Lihat Koleksi
              <ArrowRight size={18} />
            </Link>

            {/* Cari Motor */}
            <Link
              to="/catalog#search"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-900/50 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-gray-800"
            >
              <Search size={18} />
              Cari Motor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;