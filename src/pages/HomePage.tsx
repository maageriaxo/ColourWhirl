import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers, Heart, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BOOKS } from '../data/books';
import { Book } from '../types';

interface HomePageProps {
  onAddToCart: (book: Book) => void;
  onPreviewBook: (bookId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onAddToCart, onPreviewBook }) => {
  const adultBook = BOOKS.find(b => b.category === 'adult') || BOOKS[0];
  const wellnessBook = BOOKS.find(b => b.category === 'wellness') || BOOKS[1];
  const kidsBooks = BOOKS.filter(b => b.category === 'kids');

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/40 via-amber-50/20 to-transparent pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Soft Background Accents */}
        <div className="absolute top-12 left-1/4 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-32 right-1/4 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 text-violet-800 text-xs font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                <span>Curated Colouring Books & Guided Journals</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Unplug, Unwind & <br />
                <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-violet-600 bg-clip-text text-transparent font-serif italic font-normal">
                  Whirl your World.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Immerse yourself in therapeutic, screen-free creativity. Discover our collection of adult scenic stress-relief books, guided mindfulness journals, and joyful activity books for children.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/books"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Explore Available Books</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => onPreviewBook(adultBook.id)}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-violet-600" />
                  <span>Peek Inside Adults Book</span>
                </button>
              </div>

              {/* Key Features */}
              <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Bleed-Resistant 120–140 GSM Paper
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Prompt Doorstep Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  M-Pesa Verified
                </span>
              </div>
            </div>

            {/* Right Column: 3D Visual Book Fan */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] flex items-center justify-center">
                
                {/* Adults Colouring Book */}
                <div 
                  onClick={() => onPreviewBook(adultBook.id)}
                  className="absolute w-52 sm:w-60 rounded-2xl overflow-hidden book-shadow transform -rotate-12 -translate-x-12 translate-y-4 cursor-pointer hover:rotate-0 hover:z-30 transition-all group"
                  title="Click to peek inside Adults Colouring Book"
                >
                  <img 
                    src={adultBook.coverImage} 
                    alt={adultBook.title} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform" 
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    Adults • KES 350
                  </div>
                </div>

                {/* ColourWhirl Wellness Flagship */}
                <div 
                  onClick={() => onPreviewBook(wellnessBook.id)}
                  className="relative z-20 w-60 sm:w-68 rounded-2xl overflow-hidden book-shadow transform hover:scale-105 transition-all cursor-pointer group border-2 border-white"
                  title="Click to peek inside ColourWhirl Wellness"
                >
                  <img 
                    src={wellnessBook.coverImage} 
                    alt={wellnessBook.title} 
                    className="w-full h-auto object-cover" 
                  />
                  <div className="absolute top-3 right-3 bg-rose-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow">
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

      {/* Category Spotlight Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Browse by Collection
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Explore dedicated books crafted for each stage of life and relaxation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category 1: Adults */}
          <Link
            to="/books?category=adult"
            className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                🌿
              </div>
              <span className="text-[11px] font-extrabold text-amber-600 uppercase tracking-wider block">
                Stress Relief
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-amber-600 transition-colors">
                Adults Colouring Books
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                40 pages of intricate scenic landmarks (Nairobi, Paris, Tokyo, Pyramids, Gardens) for deep creative focus.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
              <span>From KES 350</span>
              <span className="text-amber-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                View Collection →
              </span>
            </div>
          </Link>

          {/* Category 2: Wellness */}
          <Link
            to="/wellness"
            className="group p-6 rounded-3xl bg-gradient-to-br from-violet-50 to-rose-50 border border-violet-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform shadow-md shadow-violet-500/20">
                🧘
              </div>
              <span className="text-[11px] font-extrabold text-violet-700 uppercase tracking-wider block">
                Flagship Guided Journal
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-violet-700 transition-colors">
                Mindfulness & Wellness
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                60 guided pages pairing deep therapeutic prompts & affirmations with meditative illustrations.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-violet-100 flex items-center justify-between text-xs font-bold text-slate-800">
              <span>KES 700</span>
              <span className="text-violet-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Explore Journal →
              </span>
            </div>
          </Link>

          {/* Category 3: Kids */}
          <Link
            to="/books?category=kids"
            className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                🎨
              </div>
              <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider block">
                Early Childhood
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-emerald-600 transition-colors">
                Kids Learning & Play
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Alphabet ABC tracing, animal adventures, hygiene habits, and chores with bold kid-proof lines.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
              <span>From KES 300</span>
              <span className="text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                View Collection →
              </span>
            </div>
          </Link>
        </div>
      </section>



      {/* Customer Trust & Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Loved by Readers in Kenya
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real feedback from individuals, parents, and wellness lovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-xs space-y-3">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <p className="text-slate-600 italic leading-relaxed">
              "The Wellness Journal is everything my evenings needed. The paper quality is super thick—no bleed-through with my fineliners. Coloring while answering the reflection prompts is pure therapy."
            </p>
            <div className="font-bold text-slate-900 pt-2 border-t border-slate-100">
              — Maureen N., Westlands Nairobi
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-xs space-y-3">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <p className="text-slate-600 italic leading-relaxed">
              "I bought the Travel & Tranquil adults coloring book for my weekend wind-down. The Nairobi skyline and Paris pages are wonderfully detailed. Delivery was swift!"
            </p>
            <div className="font-bold text-slate-900 pt-2 border-t border-slate-100">
              — Kevin O., Kilimani Nairobi
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-xs space-y-3">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <p className="text-slate-600 italic leading-relaxed">
              "My 4-year-old daughter is obsessed with the Alphabet ABC book. Big bold pictures and tracing. Keeps her happily engaged without any tablets or phones."
            </p>
            <div className="font-bold text-slate-900 pt-2 border-t border-slate-100">
              — Brenda K., Kiambu
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
