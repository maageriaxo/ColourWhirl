import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Mail, Phone, Heart, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/books';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
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

      {/* Main Narrative */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              Creating Spaces to Breathe, Reflect & Create.
            </h2>
            
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>ColourWhirl</strong> was established in Nairobi, Kenya, in response to the growing need for screen-free mental decompression and intentional living. In our fast-paced urban environments, carving out 15 minutes of uninterrupted presence is often our greatest challenge.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              We started by asking a simple question: <em>What if coloring wasn't just treated as a children's pastime, but as a legitimate therapeutic mindfulness ritual for adults?</em>
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              That insight birthed our flagship <strong>ColourWhirl Wellness Journal</strong>—which seamlessly pairs guided self-discovery prompts on forgiveness, resilience, and childhood memories with meditative floral and scenic line art. Alongside it, our <strong>Adults Travel & Tranquil</strong> series transports colorists across global horizons, while our <strong>Kids Early Learning Series</strong> lays joyful foundations in phonics and positive habits.
            </p>

            {/* Deborah Marege Founder Profile */}
            <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 via-rose-500 to-amber-500 text-white font-serif font-black text-2xl flex items-center justify-center shadow-lg">
                DM
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{CONTACT_INFO.contactPerson}</h3>
                <p className="text-xs font-semibold text-rose-600">{CONTACT_INFO.role} & Creative Lead</p>
                <p className="text-xs text-slate-400">ColourWhirl Studio • Nairobi, Kenya</p>
              </div>
            </div>
          </div>

          {/* Right Contact Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-12 text-white flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Nairobi Studio & Distribution
              </span>
              <h3 className="text-2xl font-bold">Contact Our Team</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whether you have questions about book specs, order delivery, or bulk orders for corporate wellness workshops, we are here to help.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Phone className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">Official Line</span>
                    <span className="text-sm font-bold text-white">{CONTACT_INFO.phone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">Email Inquiries</span>
                    <span className="text-sm font-bold text-white">{CONTACT_INFO.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">Dispatch Base</span>
                    <span className="text-sm font-bold text-white">{CONTACT_INFO.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Deborah! I would like to learn more about ColourWhirl.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Chat on WhatsApp ({CONTACT_INFO.phone})</span>
              </a>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
