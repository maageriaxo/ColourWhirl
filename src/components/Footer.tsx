import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../data/books';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800 text-xs">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="inline-block">
              <img src={getAssetUrl('/logo.svg')} alt="ColourWhirl" className="h-10 w-auto bg-white/10 p-1 rounded-xl" />
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Curated physical colouring books, therapeutic journals, and early educational prints. Bringing peace, mindfulness, and creative joy to hearts and homes across Kenya.
            </p>
            <div className="space-y-1.5 text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-white font-semibold">{CONTACT_INFO.phone}</span>
                <span className="text-slate-500">({CONTACT_INFO.contactPerson})</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{CONTACT_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{CONTACT_INFO.location} • Mon–Sat (8am – 6pm)</span>
              </div>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Physical Books</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/books?category=adult" className="hover:text-amber-400 transition-colors">Adults Colouring Book (KES 350)</Link></li>
              <li><Link to="/wellness" className="hover:text-rose-400 transition-colors">ColourWhirl Wellness Journal (KES 700)</Link></li>
              <li><Link to="/books?category=kids" className="hover:text-emerald-400 transition-colors">Kids Colour Me! (KES 300)</Link></li>
              <li><Link to="/books?category=kids" className="hover:text-emerald-400 transition-colors">Alphabet ABC Book (KES 300)</Link></li>
              <li><Link to="/books" className="hover:text-white font-bold transition-colors">Complete 4-Book Bundle (KES 1,500)</Link></li>
            </ul>
          </div>

          {/* Quick Navigation & Payments */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/books" className="hover:text-white transition-colors">All Books</Link></li>
              <li><Link to="/wellness" className="hover:text-white transition-colors">Wellness Journal</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact & Wholesale</Link></li>
            </ul>
            <div className="pt-3 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[10px]">
                M-PESA
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 font-medium text-[10px]">
                Nairobi Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ColourWhirl. All rights reserved. Whirl your World.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> in Nairobi, Kenya
          </p>
        </div>

      </div>
    </footer>
  );
};
