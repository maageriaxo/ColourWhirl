import React from 'react';
import { Mail, Phone, MapPin, Sparkles, Clock, HeartHandshake } from 'lucide-react';
import { CONTACT_INFO } from '../data/books';

export const AboutBrand: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Story Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>The Story Behind ColourWhirl</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Crafting Quiet Moments in a Busy World.
                </h2>

                <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
                  <strong>ColourWhirl</strong> was founded in Nairobi with a singular mission: to bring mindfulness, emotional restoration, and tactile creativity back into everyday Kenyan lives.
                </p>

                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  We believe that colouring is not just for leisure—it is a grounding ritual. Whether you are an adult seeking to decompress from city traffic and screens, or a parent nurturing your child's early developmental milestones, every page in our collection is curated with intention and printed with premium durability.
                </p>

                {/* Team snippet */}
                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-serif font-black text-xl flex items-center justify-center shadow-md">
                    DM
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{CONTACT_INFO.contactPerson}</h4>
                    <p className="text-xs font-medium text-rose-600">{CONTACT_INFO.role} & Publishing Lead</p>
                    <p className="text-[11px] text-slate-500">ColourWhirl Studio • Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-10 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <HeartHandshake className="w-4 h-4 text-rose-500" />
                  <span>100% Kenyan Owned & Produced</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Fast Same-Day Nairobi Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Contact Card Column */}
            <div id="contact" className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 sm:p-12 text-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Direct Inquiries & Wholesale
                </span>
                <h3 className="text-2xl font-bold mt-2">Get in Touch With Us</h3>
                <p className="text-xs text-slate-400 mt-2">
                  Need bulk copies for a school, wellness retreat, church event, or corporate gift hamper? Reach out directly.
                </p>

                <div className="mt-8 space-y-4">
                  {/* Phone 1 */}
                  <a
                    href={`tel:${CONTACT_INFO.phone2.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Customer Service & Dispatch</span>
                      <span className="text-sm font-bold text-white">{CONTACT_INFO.phone2}</span>
                    </div>
                  </a>

                  {/* Phone 2 */}
                  <a
                    href={`tel:${CONTACT_INFO.phone1.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Orders Hotline</span>
                      <span className="text-sm font-bold text-white">{CONTACT_INFO.phone1}</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Email Us</span>
                      <span className="text-sm font-bold text-white">{CONTACT_INFO.email}</span>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Studio & Pickup Location</span>
                      <span className="text-sm font-bold text-white">{CONTACT_INFO.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct CTA */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Deborah! I would like to inquire about ColourWhirl books.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Start WhatsApp Chat with Deborah</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
