import React from 'react';
import { CONTACT_INFO } from '../data/books';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800 text-xs">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="ColourWhirl" className="h-10 w-auto bg-white/10 p-1 rounded-xl" />
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Curated physical colouring books, therapeutic journals, and early educational prints. Designed to bring peace, mindfulness, and creative joy to hearts and homes across Kenya.
            </p>
            <div className="text-slate-400">
              <span className="font-bold text-white block">Physical Studio & Dispatch:</span>
              <span>{CONTACT_INFO.location} • Mon to Sat (8am – 6pm)</span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Physical Books</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#catalog" className="hover:text-rose-400 transition-colors">ColourWhirl Wellness (KES 700)</a></li>
              <li><a href="#catalog" className="hover:text-rose-400 transition-colors">Travel & Tranquil (KES 350)</a></li>
              <li><a href="#catalog" className="hover:text-rose-400 transition-colors">Kids Colour Me (KES 300)</a></li>
              <li><a href="#catalog" className="hover:text-rose-400 transition-colors">Alphabet ABC Book (KES 300)</a></li>
              <li><a href="#catalog" className="hover:text-rose-400 transition-colors">Complete 4-Book Bundle (KES 1,500)</a></li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Kenyan Payment & Delivery</h4>
            <p className="text-slate-400 leading-relaxed">
              We accept safe M-Pesa STK push and direct Paybill payments. All books are inspected before shipping.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[10px]">
                M-PESA
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 font-medium text-[10px]">
                Nairobi Same-Day
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 font-medium text-[10px]">
                Countrywide Courier
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ColourWhirl. All rights reserved. Whirl your World.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for creative minds in Kenya
          </p>
        </div>

      </div>
    </footer>
  );
};
