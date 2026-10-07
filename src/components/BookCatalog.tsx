import React, { useState } from 'react';
import { Eye, ShoppingBag, Check, Sparkles, BookCheck, Shield } from 'lucide-react';
import { BOOKS } from '../data/books';
import { Book } from '../types';

interface BookCatalogProps {
  onAddToCart: (book: Book) => void;
  onPreviewBook: (bookId: string) => void;
  onDirectOrder: (book: Book) => void;
}

export const BookCatalog: React.FC<BookCatalogProps> = ({
  onAddToCart,
  onPreviewBook,
  onDirectOrder
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);

  const filteredBooks = selectedCategory === 'all'
    ? BOOKS
    : BOOKS.filter(b => b.category === selectedCategory);

  const handleAdd = (book: Book) => {
    onAddToCart(book);
    setRecentlyAdded(book.id);
    setTimeout(() => setRecentlyAdded(null), 2000);
  };

  return (
    <section id="catalog" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-violet-100/80 text-violet-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-violet-600" />
          <span>The Printed Library</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Select Your Physical Book
        </h2>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          Printed locally in Nairobi on thick, non-bleed artist paper. Shipped right to your doorstep or local parcel station.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: 'all', label: 'All Collections' },
            { id: 'wellness', label: 'Mindfulness & Journaling' },
            { id: 'adult', label: 'Adult Scenic Travel' },
            { id: 'kids', label: 'Kids & Early Learning' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === tab.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => {
          const isAdded = recentlyAdded === book.id;

          return (
            <div
              key={book.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1.5"
            >
              {/* Image Preview Container */}
              <div className="relative p-5 pb-0 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
                {book.badge && (
                  <span className="absolute top-4 left-4 z-10 bg-rose-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md">
                    {book.badge}
                  </span>
                )}

                <span className="absolute top-4 right-4 z-10 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  {book.pages} Pages
                </span>

                <div 
                  onClick={() => onPreviewBook(book.id)}
                  className="w-full max-w-[200px] aspect-[1/1.4] rounded-xl overflow-hidden book-shadow cursor-pointer relative"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-rose-500" />
                      Look Inside
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 mb-1">
                    {book.categoryLabel}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 italic">
                    {book.subtitle}
                  </p>
                  <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {book.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <BookCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold mr-1">Price:</span>
                      <span className="text-2xl font-black text-slate-900">
                        KES {book.price}
                      </span>
                    </div>
                    {book.originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-medium">
                        KES {book.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onPreviewBook(book.id)}
                      className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Look Inside</span>
                    </button>

                    <button
                      onClick={() => handleAdd(book)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => onDirectOrder(book)}
                    className="w-full mt-2 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Instant Order (Doorstep Delivery)</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reassurance Footer Banner */}
      <div className="mt-14 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Want the Entire 4-Book Library Bundle?</h4>
            <p className="text-xs text-slate-600">
              Get all 4 books (Wellness + Travel & Tranquil + Kids Colour Me + Kids ABC) for just <strong>KES 1,500</strong> with free Nairobi delivery!
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            BOOKS.forEach(b => onAddToCart(b));
          }}
          className="shrink-0 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow hover:shadow-md transition-all active:scale-95"
        >
          Add Complete Bundle to Bag
        </button>
      </div>
    </section>
  );
};
