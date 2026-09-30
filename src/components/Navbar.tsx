import React from 'react';
import { ShoppingBag, Phone, Sparkles, Truck } from 'lucide-react';
import { CONTACT_INFO } from '../data/books';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onScrollToCatalog }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/60 shadow-sm transition-all">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 text-white text-xs sm:text-sm font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Truck className="w-3.5 h-3.5 animate-bounce" />
        <span>Physical Books In Stock in Nairobi • Same-Day & Nationwide Delivery • Pay via M-Pesa</span>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.svg" alt="ColourWhirl Logo" className="h-12 w-auto object-contain" />
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <button onClick={onScrollToCatalog} className="hover:text-rose-600 transition-colors">
              The Collection
            </button>
            <a href="#why-physical" className="hover:text-rose-600 transition-colors">
              Why Physical Books
            </a>
            <a href="#wellness" className="hover:text-rose-600 transition-colors flex items-center gap-1.5 text-violet-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Mindful Journaling
            </a>
            <a href="#about" className="hover:text-rose-600 transition-colors">
              About Us
            </a>
            <a href="#contact" className="hover:text-rose-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* WhatsApp Quick Order Link */}
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Hello ColourWhirl! I would like to order physical books.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Order: {CONTACT_INFO.phone2}</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden xs:inline">Bag</span>
              <span className="bg-rose-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
