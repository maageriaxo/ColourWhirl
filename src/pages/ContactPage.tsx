import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/books';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    // Build pre-filled WhatsApp link
    let waMsg = `Hello Deborah! Here is a direct message from the ColourWhirl website:%0A%0A`;
    waMsg += `*Name:* ${name}%0A`;
    if (email) waMsg += `*Email:* ${email}%0A`;
    if (phone) waMsg += `*Phone:* ${phone}%0A`;
    waMsg += `*Message:* ${message}%0A`;

    // Also build mailto link
    const mailSubject = encodeURIComponent(`[ColourWhirl Inquiry] Message from ${name}`);
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);

    // Trigger WhatsApp or mailto
    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${waMsg}`, '_blank');
    setSubmitted(true);
  };

  const handleSendEmailDirect = () => {
    const mailSubject = encodeURIComponent(`[ColourWhirl Note] from ${name}`);
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100">
          Get in Touch With Us
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
          Contact ColourWhirl
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Have an inquiry, bulk order request, or question about your delivery? Reach out directly to our Nairobi publishing team.
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
                  <span className="text-xs text-slate-500 block mt-0.5">{CONTACT_INFO.contactPerson} ({CONTACT_INFO.role})</span>
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
                  <span className="text-xs text-slate-400 font-bold block">Email Inbox</span>
                  <span className="text-base font-bold text-slate-900">{CONTACT_INFO.email}</span>
                  <span className="text-xs text-slate-500 block mt-0.5">Checked daily by our publishing team</span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-3 rounded-2xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold block">Dispatch Hub</span>
                  <span className="text-base font-bold text-slate-900">{CONTACT_INFO.location}</span>
                  <span className="text-xs text-slate-500 block mt-0.5">Same-day couriers & countrywide delivery</span>
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
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Deborah! I have a question regarding ColourWhirl books.')}`}
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
            <h2 className="text-xl font-bold text-slate-900 mb-1">Send Us a Direct Note</h2>
            <p className="text-xs text-slate-500 mb-6">
              Your note connects straight to Deborah Marege and the ColourWhirl publishing desk.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Message Dispatched!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your message has been formatted and forwarded to Deborah Marege. You can also send a copy directly to our email inbox:
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleSendEmailDirect}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    Send to Email ({CONTACT_INFO.email})
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
                  >
                    Write Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-slate-50/50"
                    />
                  </div>
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
                    placeholder="Write your message here..."
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Note to Deborah & Publishing Desk</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Delivered instantly to WhatsApp ({CONTACT_INFO.phone}) and {CONTACT_INFO.email}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
