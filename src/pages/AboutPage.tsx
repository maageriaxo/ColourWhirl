import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Feather, BookOpen, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/books';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
          Our Story & Vision
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
          About ColourWhirl
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-serif italic">
          "Whirl your World — bringing mindfulness, emotional restoration, and tactile creativity to Kenyan homes."
        </p>
      </div>

      {/* Main Narrative Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12 lg:p-16 space-y-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
            Creating Spaces to Breathe, Reflect & Create.
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            <strong>ColourWhirl</strong> was established in Nairobi, Kenya, in response to the growing need for screen-free mental decompression and intentional living. In our fast-paced urban environments, carving out 15 minutes of uninterrupted presence is often our greatest challenge.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We started by asking a simple question: <em>What if coloring wasn't just treated as a children's pastime, but as a legitimate therapeutic mindfulness ritual for adults?</em>
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            That insight birthed our flagship <strong>ColourWhirl Wellness Journal</strong>—which seamlessly pairs guided self-discovery prompts on forgiveness, resilience, and childhood memories with meditative floral and scenic line art. Alongside it, our <strong>Adults Travel & Tranquil</strong> series transports colorists across global horizons, while our <strong>Kids Early Learning Series</strong> lays joyful foundations in phonics and positive habits.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80">
              <Heart className="w-6 h-6 text-rose-500 mb-2" />
              <h3 className="font-bold text-sm text-slate-900">Mindful Well-being</h3>
              <p className="text-xs text-slate-500 mt-1">Grounding questions designed to restore inner peace.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80">
              <Feather className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="font-bold text-sm text-slate-900">Heavyweight Stock</h3>
              <p className="text-xs text-slate-500 mt-1">Thick 120–140 GSM artist-grade paper that never bleeds.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80">
              <BookOpen className="w-6 h-6 text-violet-500 mb-2" />
              <h3 className="font-bold text-sm text-slate-900">Early Learning</h3>
              <p className="text-xs text-slate-500 mt-1">Phonics and life habits crafted with love for kids.</p>
            </div>
          </div>

          {/* Deborah Marege Profile */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 via-rose-500 to-amber-500 text-white font-serif font-black text-2xl flex items-center justify-center shadow-lg shrink-0">
              DM
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900">{CONTACT_INFO.contactPerson}</h3>
              <p className="text-xs font-semibold text-rose-600">{CONTACT_INFO.role} & Publishing Lead</p>
              <p className="text-xs text-slate-500 mt-1">
                ColourWhirl Creative Studio • Proudly Conceptualized and Printed in Nairobi, Kenya
              </p>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Have a Question? Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
