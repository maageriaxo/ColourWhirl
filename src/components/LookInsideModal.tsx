import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Check, Layers, Sparkles } from 'lucide-react';
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

  if (!book) return null;

  const totalPages = book.sampleImages.length;
  const currentSample = book.sampleImages[currentPage];

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleAdd = () => {
    onAddToCart(book);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg transition-transform active:scale-90"
          aria-label="Close preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Interactive Page Flipper */}
        <div className="md:w-7/12 bg-slate-100 flex flex-col items-center justify-center p-6 relative select-none">
          <div className="relative w-full max-w-sm aspect-[1/1.4] bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200/80 flex items-center justify-center">
            {/* Real Extracted Page Image */}
            <img
              src={currentSample.url}
              alt={currentSample.title}
              className="w-full h-full object-contain p-2 transition-all duration-300"
            />

            {/* Previous Page Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              aria-label="Previous sample page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Page Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              aria-label="Next sample page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Page Indicators & Caption */}
          <div className="mt-4 text-center">
            <h4 className="text-sm font-bold text-slate-900">{currentSample.title}</h4>
            {currentSample.description && (
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-0.5">{currentSample.description}</p>
            )}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {book.sampleImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentPage === idx ? 'w-6 bg-rose-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Jump to sample page ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
              Sample spread {currentPage + 1} of {totalPages}
            </span>
          </div>
        </div>

        {/* Right: Book Overview & Specs */}
        <div className="md:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-rose-600 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Physical Paperback Edition</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              {book.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 italic">{book.subtitle}</p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-950">
                KES {book.price}
              </span>
              {book.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  KES {book.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {book.description}
            </p>

            {/* Specs List */}
            <div className="mt-5 space-y-2.5 pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-900">Physical Book Specifications:</div>
              <div className="flex items-start gap-2 text-xs text-slate-600">
                <Layers className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Total Pages: </span>
                  {book.pages} pages
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-600">
                <Layers className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Paper Weight: </span>
                  {book.paperSpec}
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-600">
                <Layers className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Format & Size: </span>
                  {book.dimensions}
                </div>
              </div>
            </div>

            {/* Affirmations snippet if wellness */}
            {book.affirmations && (
              <div className="mt-4 p-3 bg-violet-50/80 rounded-xl border border-violet-100 text-xs text-violet-900">
                <span className="font-bold block mb-1">Featured In-Book Affirmation:</span>
                <span className="italic">"{book.affirmations[0]}"</span>
              </div>
            )}
          </div>

          {/* Action CTA */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-950 hover:bg-slate-800 text-white shadow-slate-900/20'
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
              Dispatched from Nairobi • Pay via M-Pesa on checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
