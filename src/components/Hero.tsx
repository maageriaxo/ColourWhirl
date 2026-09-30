import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { BOOKS } from '../data/books';

interface HeroProps {
  onScrollToCatalog: () => void;
  onPreviewBook: (bookId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCatalog, onPreviewBook }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-[#FAF8F5] to-[#FAF8F5] pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-violet-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-60 left-10 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-bold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-rose-500 animate-spin" />
              <span>100% Tangible Physical Books • Printed in Nairobi</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Unplug, Unwind & <br />
              <span className="bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 bg-clip-text text-transparent font-serif italic font-normal">
                Whirl your World.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience the tactile joy of holding real books. From mindful self-reflection journals for adults to early-learning alphabet coloring for kids—crafted with heavyweight 120–140 GSM bleed-resistant artist paper.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onScrollToCatalog}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-base shadow-lg shadow-rose-500/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5"
              >
                <span>Browse Physical Books</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => onPreviewBook(BOOKS[0].id)}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-violet-600" />
                <span>Peek Inside Bestseller</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-amber-100/80 text-amber-800">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Heavyweight Stock</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">No marker bleed-through</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-100/80 text-emerald-800">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Safe M-Pesa</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Prompt direct to phone</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-violet-100/80 text-violet-800">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Fast Delivery</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Nairobi & Kenya-wide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Column: 3D Book Fanout */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">
              
              {/* Back Book 1 (Kids Book) */}
              <div 
                onClick={() => onPreviewBook('kids-colour-me')}
                className="absolute w-56 sm:w-64 rounded-xl overflow-hidden book-shadow transform -rotate-12 -translate-x-14 translate-y-6 hover:rotate-0 hover:z-30 transition-all cursor-pointer group"
              >
                <img 
                  src="/images/kids_colouring_books/page_1.jpg" 
                  alt="Kids Colour Me Physical Book" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform" 
                />
                <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  KES 300
                </div>
              </div>

              {/* Back Book 2 (Travel & Tranquil) */}
              <div 
                onClick={() => onPreviewBook('travel-and-tranquil')}
                className="absolute w-56 sm:w-64 rounded-xl overflow-hidden book-shadow transform rotate-12 translate-x-14 translate-y-4 hover:rotate-0 hover:z-30 transition-all cursor-pointer group"
              >
                <img 
                  src="/images/travel___tranquil/page_1.jpg" 
                  alt="Travel and Tranquil Physical Book" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform" 
                />
                <div className="absolute top-3 right-3 bg-sky-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  KES 350
                </div>
              </div>

              {/* Front Hero Book (ColourWhirl Wellness) */}
              <div 
                onClick={() => onPreviewBook('colourwhirl-wellness')}
                className="relative z-20 w-64 sm:w-72 rounded-2xl overflow-hidden book-shadow transform hover:scale-105 transition-all cursor-pointer group border-2 border-white/60"
              >
                <img 
                  src="/images/colouewhirl_wellness/page_1.jpg" 
                  alt="ColourWhirl Wellness Physical Journal" 
                  className="w-full h-auto object-cover" 
                />
                <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
                  ⭐ Bestseller
                </div>
                <div className="absolute bottom-4 right-4 bg-slate-900/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                  KES 700
                </div>
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-slate-900 text-xs font-black px-4 py-2 rounded-full shadow flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                    Click to Peek Inside
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
