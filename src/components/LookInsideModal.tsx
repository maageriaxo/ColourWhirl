import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Check, Layers, Sparkles, BookOpen } from 'lucide-react';
import { Book } from '../types';

interface LookInsideModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
}

export const LookInsideModal: React.FC<LookInsideModalProps> = ({
  book,
  onClose,
  onAddToCart
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  // Reset page when book changes
  useEffect(() => {
    setCurrentPage(0);
  }, [book?.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!book) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentPage(p => (p + 1) % book.sampleImages.length);
      if (e.key === 'ArrowLeft') setCurrentPage(p => (p - 1 + book.sampleImages.length) % book.sampleImages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const samples = book.sampleImages || [];
  const totalPages = samples.length;
  const safeIndex = currentPage >= 0 && currentPage < totalPages ? currentPage : 0;
  const currentSample = samples[safeIndex] || {
    url: book.coverImage,
    title: book.title,
    description: book.subtitle
  };

  const handleNext = () => {
    setCurrentPage(p => (p + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage(p => (p - 1 + totalPages) % totalPages);
  };

  const handleAdd = () => {
    onAddToCart(book);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
          aria-label="Close Look Inside"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Real Page Spread Display */}
        <div className="md:w-7/12 bg-slate-100/90 flex flex-col justify-between p-4 sm:p-6 select-none border-b md:border-b-0 md:border-r border-slate-200">
          
          {/* Top Page Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-rose-500" />
              <span>Looking Inside: {book.title}</span>
            </span>
            <span className="bg-slate-200 text-slate-800 font-extrabold px-2.5 py-0.5 rounded-full text-[11px]">
              Sample Spread {safeIndex + 1} of {totalPages}
            </span>
          </div>

          {/* Main Large Image Canvas */}
          <div className="relative my-3 flex-1 min-h-[320px] sm:min-h-[420px] max-h-[520px] flex items-center justify-center bg-white rounded-2xl shadow-inner border border-slate-200 overflow-hidden p-3">
            <img
              src={currentSample.url}
              alt={currentSample.title}
              key={currentSample.url}
              className="max-h-full max-w-full object-contain rounded-lg transition-opacity duration-200"
            />

            {/* Left Prev Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-xl border border-slate-200 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              title="Previous sample page (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-xl border border-slate-200 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              title="Next sample page (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption & Thumbnails */}
          <div className="space-y-3 pt-2">
            <div className="text-center">
              <h4 className="text-sm font-bold text-slate-900">{currentSample.title}</h4>
              {currentSample.description && (
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{currentSample.description}</p>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
              {samples.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-12 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    safeIndex === idx
                      ? 'border-rose-500 ring-2 ring-rose-300 scale-105'
                      : 'border-slate-300 opacity-60 hover:opacity-100 hover:border-slate-400'
                  }`}
                  title={`View ${item.title}`}
                >
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Book Details & Direct Bag Add */}
        <div className="md:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[11px] font-extrabold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>{book.categoryLabel}</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              {book.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 italic">{book.subtitle}</p>

            {/* Price Badge */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-950">
                KES {book.price}
              </span>
              {book.originalPrice && (
                <span className="text-sm text-slate-400 line-through font-medium">
                  KES {book.originalPrice}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Physical Paperback
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
              {book.description}
            </p>

            {/* Physical Specs */}
            <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs">
              <div className="font-bold text-slate-900 mb-1">Book Specifications:</div>
              <div className="flex items-start gap-2 text-slate-600">
                <Layers className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                <span><strong>Total Pages:</strong> {book.pages} physical pages</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <Layers className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Paper:</strong> {book.paperSpec}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <Layers className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Format:</strong> {book.dimensions}</span>
              </div>
            </div>

            {/* Affirmation snippet if present */}
            {book.affirmations && (
              <div className="mt-4 p-3 bg-violet-50 rounded-xl border border-violet-100 text-xs text-violet-900">
                <span className="font-bold block text-[11px] uppercase tracking-wider text-violet-700">Sample Affirmation:</span>
                <span className="italic mt-0.5 block">"{book.affirmations[0]}"</span>
              </div>
            )}
          </div>

          {/* Add to Bag Button */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={handleAdd}
              className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-950 hover:bg-slate-800 text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Shopping Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Add Physical Copy to Bag (KES {book.price})</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-500">
              Dispatched from Nairobi • Pay with M-Pesa
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
