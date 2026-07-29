import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Footer = () => {
  const phoneNumber = '6281234567890';

  const message = encodeURIComponent(
    'Halo, saya ingin menanyakan ketersediaan motor di showroom.'
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <footer className="border-t border-gray-200 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              Motorcycle Showroom
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
              Temukan motor pilihan dengan kondisi terbaik
              dan informasi yang transparan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Navigasi
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                to="/"
                className="text-gray-500 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/catalog"
                className="text-gray-500 transition hover:text-white"
              >
                Catalog
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Hubungi Kami
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Punya pertanyaan mengenai unit atau ingin
              mengetahui ketersediaan motor?
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-green-200"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Motorcycle Showroom.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;