import React from 'react';
import { Sparkles, Heart, CheckCircle2, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { BOOKS } from '../data/books';
import { Book } from '../types';

interface WellnessPageProps {
  onAddToCart: (book: Book) => void;
  onPreviewBook: (bookId: string) => void;
}

export const WellnessPage: React.FC<WellnessPageProps> = ({ onAddToCart, onPreviewBook }) => {
  const wellnessBook = BOOKS.find(b => b.id === 'colourwhirl-wellness') || BOOKS[0];

  const themes = [
    { title: 'Childhood Roots', prompt: 'What memories from childhood still shape how you see yourself today?', affirmation: 'My past is part of me, but it does not define me.' },
    { title: 'Self-Awareness', prompt: 'When you slow down, what do you notice about yourself?', affirmation: 'I am learning to know myself.' },
    { title: 'Strengths & Gifts', prompt: 'What are you naturally good at — something that feels effortless for you?', affirmation: 'My gifts are valuable, and I honour them.' },
    { title: 'Gratitude', prompt: 'What small moment brought you joy today?', affirmation: 'Gratitude lights my path.' },
    { title: 'Healing Trauma', prompt: 'What wounds in your story still need gentle healing?', affirmation: 'I give myself permission to heal.' },
    { title: 'Letting Go', prompt: 'What burdens are you ready to release today?', affirmation: 'I let go of what no longer serves me.' },
    { title: 'Resilience', prompt: 'What helps you rise again after setbacks?', affirmation: 'I bend but I do not break.' },
    { title: 'Five-Year Vision', prompt: 'Five years from now, what changes would make you proud?', affirmation: 'I am growing into my vision.' },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-20">
      
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 text-violet-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>Flagship Physical Release • 60 Pages</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              ColourWhirl Wellness Journal
            </h1>
            <p className="text-lg text-slate-600 font-serif italic">
              "A gentle mirror — a space where you can pause, breathe and meet yourself with compassion."
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Designed in Nairobi, this 60-page guided journal brings therapeutic mindfulness into your daily routine. On every spread, introspective journal questions and empowering affirmations are paired with intricate, serene illustrations to color as your thoughts unfold.
            </p>

            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">KES {wellnessBook.price}</span>
              <span className="text-sm text-slate-400 line-through">KES {wellnessBook.originalPrice}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Physical Paperback In Stock
              </span>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onAddToCart(wellnessBook)}
                className="px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg shadow-slate-900/20 transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Add Journal to Bag (KES {wellnessBook.price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onPreviewBook(wellnessBook.id)}
                className="px-7 py-4 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-violet-600" />
                <span>Peek Inside Sample Pages</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div 
              onClick={() => onPreviewBook(wellnessBook.id)}
              className="w-64 sm:w-80 rounded-3xl overflow-hidden book-shadow border-4 border-white cursor-pointer group relative"
            >
              <img 
                src={wellnessBook.coverImage} 
                alt="ColourWhirl Wellness" 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform" 
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-rose-500" />
                  Click to Browse Pages
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Guided Reflection Themes */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">
              The Therapeutic Journey Inside
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Each chapter pairs an introspective writing prompt with positive affirmations and grounding artwork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {themes.map((t, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-[#FAF8F5] border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                    Chapter {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-3">{t.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 italic leading-relaxed">"{t.prompt}"</p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-200/60 text-[11px] font-bold text-violet-800">
                  Affirmation: {t.affirmation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Quality */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Heavyweight 140 GSM Woodfree Stock
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Standard notebooks bleed when used with markers or fountain pens. The ColourWhirl Wellness journal is bound with heavyweight 140 GSM artist paper, ensuring every page handles colored pencils, gel pens, and light ink with crisp opacity.
        </p>
        <button
          onClick={() => onAddToCart(wellnessBook)}
          className="px-8 py-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
        >
          Add Wellness Journal to Bag (KES 700)
        </button>
      </section>

    </div>
  );
};
