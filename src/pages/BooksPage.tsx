import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Eye, ShoppingBag, Check, BookOpen, Layers, Sparkles, ShieldCheck } from 'lucide-react';
import { BOOKS } from '../data/books';
import { Book } from '../types';

interface BooksPageProps {
  onAddToCart: (book: Book) => void;
  onPreviewBook: (bookId: string) => void;
}

export const BooksPage: React.FC<BooksPageProps> = ({ onAddToCart, onPreviewBook }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [addedBookId, setAddedBookId] = useState<string | null>(null);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const handleFilter = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const handleAdd = (book: Book) => {
    onAddToCart(book);
    setAddedBookId(book.id);
    setTimeout(() => setAddedBookId(null), 2000);
  };

  const filteredBooks = activeCategory === 'all'
    ? BOOKS
    : BOOKS.filter(b => b.category === activeCategory);

  const adultBooks = BOOKS.filter(b => b.category === 'adult');
  const wellnessBooks = BOOKS.filter(b => b.category === 'wellness');
  const kidsBooks = BOOKS.filter(b => b.category === 'kids');

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-4 border border-rose-100">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Physical Paperback Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Available Books Collection
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          Printed in Nairobi on thick bleed-proof artist stock. Choose from adults stress-relief coloring, therapeutic guided journals, and kids activity books.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: 'all', label: `All Books (${BOOKS.length})` },
            { id: 'adult', label: `🌿 Adults Colouring Books (${adultBooks.length})` },
            { id: 'wellness', label: `🧘 Wellness Journals (${wellnessBooks.length})` },
            { id: 'kids', label: `🎨 Kids Activity Books (${kidsBooks.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeCategory === tab.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
        {filteredBooks.map((book) => {
          const isAdded = addedBookId === book.id;

          return (
            <div
              key={book.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col md:flex-row gap-6 lg:gap-8 group"
            >
              {/* Left: Book Cover & Look Inside CTA */}
              <div className="md:w-5/12 flex flex-col items-center shrink-0">
                <div 
                  onClick={() => onPreviewBook(book.id)}
                  className="w-48 sm:w-56 aspect-[1/1.4] rounded-2xl overflow-hidden book-shadow cursor-pointer relative group-hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                      Look Inside
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onPreviewBook(book.id)}
                  className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4 text-violet-600" />
                  <span>Peek Inside ({book.sampleImages.length} Samples)</span>
                </button>
              </div>

              {/* Right: Book Details & Actions */}
              <div className="md:w-7/12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-rose-600">
                      {book.categoryLabel}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {book.pages} Pages
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {book.title}
                  </h2>
                  <p className="text-xs text-slate-500 italic mt-0.5">{book.subtitle}</p>

                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{book.paperSpec}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{book.dimensions}</span>
                    </div>
                  </div>
                </div>

                {/* Price and Add to Bag */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      KES {book.price}
                    </span>
                    {book.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        KES {book.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAdd(book)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Shopping Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-amber-400" />
                        <span>Add to Bag (KES {book.price})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Bundle Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Special Value Bundle
          </span>
          <h3 className="text-2xl font-black mt-2">
            Get the Entire 4-Book Library for KES 1,500
          </h3>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl">
            Includes ColourWhirl Wellness (60 pgs), Adults Travel & Tranquil (40 pgs), Kids Colour Me (24 pgs), and Alphabet ABC (36 pgs).
          </p>
        </div>
        <button
          onClick={() => {
            BOOKS.forEach(b => onAddToCart(b));
          }}
          className="shrink-0 px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-sm shadow-lg hover:bg-slate-100 transition-all active:scale-95"
        >
          Add Complete Bundle (KES 1,500)
        </button>
      </div>

    </div>
  );
};
