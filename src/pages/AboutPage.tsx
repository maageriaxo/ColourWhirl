import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Feather, BookOpen, ArrowRight, EyeOff, Brain, Palette, Award, Sparkles 
} from 'lucide-react';
import { CONTACT_INFO } from '../data/books';

export const AboutPage: React.FC = () => {
  const physicalPillars = [
    {
      icon: EyeOff,
      title: 'Digital Fatigue & Screen Detox',
      badge: 'Mental Wellness',
      desc: 'Our eyes spend 8–12 hours a day locked to screens. Shifting to physical paper triggers a genuine parasympathetic nervous response, lowering cortisol and allowing deep cognitive relaxation.'
    },
    {
      icon: Feather,
      title: 'Bleed-Resistant 120–140 GSM Stock',
      badge: 'Craftsmanship',
      desc: 'Standard paper buckles and bleeds through. ColourWhirl books are crafted on high-opacity woodfree bond paper, engineered specifically for colored pencils, brush pens, and crayons.'
    },
    {
      icon: Brain,
      title: 'Enhanced Cognitive Memory',
      badge: 'Neuroscience',
      desc: 'Studies demonstrate that writing and hand-drawing on physical paper creates tactile spatial memory pathways that typing or tapping on glass simply cannot replicate.'
    },
    {
      icon: Palette,
      title: 'Early Fine Motor Skills for Children',
      badge: 'Childhood Development',
      desc: 'Physical pencil grip, boundary-controlled coloring, and paper tracing establish the foundational hand-eye coordination required for handwriting and spatial reasoning.'
    },
    {
      icon: Award,
      title: 'Tangible Keepsakes to Frame',
      badge: 'Permanence',
      desc: 'Unlike digital drawings lost in an app, your completed spreads can be framed as wall art, gifted to loved ones, or preserved as a physical record of your personal growth.'
    },
    {
      icon: Sparkles,
      title: 'Consciously Produced in Nairobi',
      badge: 'Local Roots',
      desc: 'Every edition is designed and produced in Nairobi, Kenya, supporting local printers, binders, and creative illustrators.'
    }
  ];

  return (
    <div className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* ================= PART 1: ABOUT US NARRATIVE ================= */}
      <section className="space-y-12">
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

        {/* Narrative Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12 lg:p-16 space-y-8">
          <div className="space-y-6">
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

            {/* Core Values */}
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
                <span>Contact Deborah</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PART 2: WHY PHYSICAL BOOKS ================= */}
      <section className="space-y-12 pt-6 border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100">
            The Sensory Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Why We Believe in Physical Books
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            In an era of endless scrolling, push notifications, and blue light, physical paper gives your mind what it craves most: an uninterrupted sanctuary of calm.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {physicalPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Reclaim Your Quiet Time?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Explore our collection of physical books, from the 40-page Adults Travel & Tranquil coloring book to the 60-page guided Wellness Journal.
          </p>
          <Link
            to="/books"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition-all active:scale-95"
          >
            <span>Browse the Library</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
