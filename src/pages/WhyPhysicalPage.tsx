import React from 'react';
import { Link } from 'react-router-dom';
import { EyeOff, Feather, Brain, Palette, Award, Sparkles, ArrowRight } from 'lucide-react';

export const WhyPhysicalPage: React.FC = () => {
  const pillars = [
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
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100">
          The Sensory Experience
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
          Why We Believe in Physical Books
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          In an era of endless scrolling, push notifications, and blue light, physical paper gives your mind what it craves most: an uninterrupted sanctuary of calm.
        </p>
      </div>

      {/* 6 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pillars.map((item, idx) => {
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

      {/* CTA Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold">
          Ready to Reclaim Your Quiet Time?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
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

    </div>
  );
};
