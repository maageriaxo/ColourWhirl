import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Phone, Menu, X, Sparkles, BookOpen } from 'lucide-react';
import { CONTACT_INFO } from '../data/books';

interface NavbarProps {
  cartCount: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/books', label: 'All Books' },
    { to: '/track', label: 'Track Order' },
    { to: '/wellness', label: 'Wellness Journal' },
    { to: '/why-physical', label: 'Why Physical' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with high resolution */}
          <Link to="/" className="flex items-center gap-2 group py-2">
            <img 
              src="/logo.svg" 
              alt="ColourWhirl — Whirl your World" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors py-1 border-b-2 ${
                    isActive
                      ? 'text-rose-600 border-rose-500'
                      : 'border-transparent text-slate-700 hover:text-rose-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Shopping Bag Button linking to /cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden xs:inline">Bag</span>
              {cartCount > 0 && (
                <span className="bg-rose-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-50"
            >
              <Phone className="w-4 h-4 text-rose-500" />
              <span>Call: {CONTACT_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Hello ColourWhirl! I want to order physical books.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp ({CONTACT_INFO.phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
