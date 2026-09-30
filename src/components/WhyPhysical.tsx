import React from 'react';
import { EyeOff, Feather, Sparkles, Brain, Award, Palette } from 'lucide-react';

export const WhyPhysical: React.FC = () => {
  const benefits = [
    {
      icon: EyeOff,
      title: 'Zero Screen Time & Eye Strain',
      color: 'bg-rose-100 text-rose-600',
      description: 'Step away from blue-light screens and notifications. Real paper allows your nervous system to genuinely downshift into rest-and-digest mode.'
    },
    {
      icon: Feather,
      title: 'Heavyweight Artist Paper (100–140 GSM)',
      color: 'bg-amber-100 text-amber-600',
      description: 'Unlike flimsy printouts, our physical books use thick, bleed-resistant stock engineered specifically for colored pencils, gel pens, and light paints.'
    },
    {
      icon: Brain,
      title: 'Mindfulness & Therapeutic Reflection',
      color: 'bg-violet-100 text-violet-600',
      description: 'Physical writing engages deeper cognitive memory and emotional processing than tapping on a glass tablet screen.'
    },
    {
      icon: Palette,
      title: 'Childhood Motor Skills & Focus',
      color: 'bg-emerald-100 text-emerald-600',
      description: 'Holding physical crayons and learning letter tracing develops fine motor coordination, pen grip, and spatial reasoning in kids.'
    },
    {
      icon: Award,
      title: 'A Keepsake You Can Proudly Keep',
      color: 'bg-sky-100 text-sky-600',
      description: 'Turn your finished colored spreads into framed art or a cherished personal journal of your thoughts, growth, and affirmations.'
    },
    {
      icon: Sparkles,
      title: 'Curated by Nairobi Creatives',
      color: 'bg-purple-100 text-purple-600',
      description: 'Thoughtfully conceptualized and printed in Nairobi, Kenya, celebrating both African heritage and universal tranquility.'
    }
  ];

  return (
    <section id="why-physical" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            The Tangible Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Why We Choose Physical Over Digital
          </h2>
          <p className="mt-3 text-base text-slate-600">
            In a world filled with digital noise, there is unmatched magic in the tactile texture of thick paper, the smell of fresh print, and the rhythm of coloring by hand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-3xl bg-[#FAF8F5] border border-slate-200/70 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-2xl ${b.color} flex items-center justify-center mb-5 shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
