import React from 'react';
import { Sparkles, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { BOOKS } from '../data/books';
import { Book } from '../types';

interface WellnessFeatureProps {
  onPreviewBook: (bookId: string) => void;
  onAddToCart: (book: Book) => void;
}

export const WellnessFeature: React.FC<WellnessFeatureProps> = ({ onPreviewBook, onAddToCart }) => {
  const wellnessBook = BOOKS.find(b => b.id === 'colourwhirl-wellness') || BOOKS[0];

  const themes = [
    { title: 'Childhood Roots', desc: 'Reflecting on memories that shaped who you are today.' },
    { title: 'Identity & Core Self', desc: 'Looking beyond roles & duties into what truly makes you whole.' },
    { title: 'Forgiveness & Letting Go', desc: 'Releasing burdens that no longer serve your peace.' },
    { title: 'Resilience & Courage', desc: 'Grounding reminders that you bend but never break.' },
    { title: 'Gratitude & Joy', desc: 'Celebrating small daily moments that light up your spirit.' },
    { title: 'Five-Year Vision', desc: 'Crafting intentions and habits that anchor your future.' }
  ];

  return (
    <section id="wellness" className="py-20 lg:py-28 bg-gradient-to-br from-violet-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-bold mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Flagship Physical Release • 60 Heavyweight Pages</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              A Gentle Mirror For <br />
              <span className="font-serif italic font-normal text-rose-300">
                Your Mind & Spirit.
              </span>
            </h2>

            <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              "This book is a gentle mirror — a space where you can pause, breathe, and meet yourself with compassion. There are no right or wrong answers here, only your truth unfolding softly."
            </p>

            {/* Themes Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {themes.map((t, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                    <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                    <span>{t.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onAddToCart(wellnessBook)}
                className="px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/30 transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Order Physical Journal (KES 700)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onPreviewBook(wellnessBook.id)}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
              >
                Peek Inside the 60 Pages
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden book-shadow border-4 border-white/10">
              <img
                src={wellnessBook.coverImage}
                alt="ColourWhirl Wellness Journal"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-center">
                <p className="text-xs font-serif italic text-amber-200">
                  "May these pages remind you that you are seen, valued and worthy of growth."
                </p>
                <span className="text-[11px] font-bold text-white/80 mt-1 block">
                  — ColourWhirl Nairobi
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                140 GSM Stock
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Smyth-Sewn Durability
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                A4 Format
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
