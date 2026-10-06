import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/books';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100">
          We'd Love To Hear From You
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
          Contact ColourWhirl
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Have an inquiry, bulk order request, or need help with delivery tracking? Reach out directly to our Nairobi team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Direct Contact Information</h2>
            
            <div className="space-y-5 text-xs sm:text-sm">
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold block">Telephone & WhatsApp</span>
                  <span className="text-base font-bold text-slate-900">{CONTACT_INFO.phone}</span>
                  <span className="text-xs text-slate-500 block mt-0.5">Contact: {CONTACT_INFO.contactPerson}</span>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold block">Email Us</span>
                  <span className="text-base font-bold text-slate-900">{CONTACT_INFO.email}</span>
                  <span className="text-xs text-slate-500 block mt-0.5">Replies within 1 business day</span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-3 rounded-2xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold block">Dispatch Hub</span>
                  <span className="text-base font-bold text-slate-900">{CONTACT_INFO.location}</span>
                  <span className="text-xs text-slate-500 block mt-0.5">Same-day Nairobi couriers</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-2xl">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold block">Operating Hours</span>
                  <span className="text-sm font-bold text-slate-900">{CONTACT_INFO.hours}</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-4 border-t border-slate-100">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Hello ColourWhirl! I have a question regarding your books.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Send Us a Direct Note</h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your inquiry and we will get back to you shortly.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Thank you, {name}! Deborah and our publishing team will respond to {email} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-bold text-emerald-800 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Samuel Mutua"
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. samuel@example.com"
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message / Inquiry *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about our physical book editions, custom gift hampers, school orders, or delivery timelines..."
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to ColourWhirl</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
