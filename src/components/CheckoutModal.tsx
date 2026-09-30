import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Phone, MapPin, Truck, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, DeliveryOption } from '../types';
import { CONTACT_INFO, DELIVERY_OPTIONS } from '../data/books';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  selectedDeliveryId: string;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  selectedDeliveryId,
  onClearCart
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const delivery = DELIVERY_OPTIONS.find(d => d.id === selectedDeliveryId) || DELIVERY_OPTIONS[0];
  const total = subtotal + (items.length > 0 ? delivery.price : 0);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }
    setStep('payment');
  };

  const handleTriggerMpesa = () => {
    setIsProcessing(true);
    // Generate order code
    const generatedId = `CW-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);

    // Simulate STK Push prompt to phone
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onClearCart();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2500);
  };

  const handleWhatsAppDirect = () => {
    const generatedId = `CW-${Math.floor(1000 + Math.random() * 9000)}`;
    let msg = `Hello Deborah! I just placed an order on ColourWhirl:%0A`;
    msg += `*Order Ref:* ${generatedId}%0A`;
    msg += `*Customer:* ${fullName} (${phone})%0A`;
    msg += `*Delivery To:* ${address}, ${county}%0A`;
    msg += `*Delivery Method:* ${delivery.name}%0A%0A`;
    msg += `*Books Ordered:*%0A`;
    items.forEach((item, idx) => {
      msg += `- ${item.book.title} x ${item.quantity} (KES ${item.book.price * item.quantity})%0A`;
    });
    msg += `%0A*Total Amount Due:* KES ${total}%0A`;
    msg += `Please send me payment instructions and dispatch confirmation!`;

    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${msg}`, '_blank');
    setOrderId(generatedId);
    setStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
              CW
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Physical Book Order</h3>
              <p className="text-[11px] text-slate-500">Shipped direct from Nairobi</p>
            </div>
          </div>
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Step 1: Details */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grace Wanjiku"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  M-Pesa / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  County *
                </label>
                <input
                  type="text"
                  required
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  placeholder="e.g. Nairobi / Kiambu / Mombasa"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estate / Town / Building *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Kilimani, Wood Avenue Apt 4B"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Delivery Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Leave with security / Call upon arrival / Send to Easy Coach parcel"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            {/* Order Brief */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Books ({items.reduce((acc, i) => acc + i.quantity, 0)}) + {delivery.name}</span>
                <span className="text-rose-600 text-sm">KES {total}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Estimated arrival: <strong>{delivery.timeframe}</strong>
              </p>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <div className="mt-6 space-y-5">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>M-Pesa STK Push Payment</span>
              </div>
              <p className="text-xs text-emerald-800 mt-1">
                We will send an instant payment prompt to <strong>{phone}</strong> for <strong>KES {total}</strong>.
              </p>
            </div>

            <div className="text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-slate-800">How M-Pesa Prompt Works:</div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-500">
                <li>Click <strong>"Send STK Push Prompt"</strong> below.</li>
                <li>Check your phone screen for the Safaricom M-Pesa prompt.</li>
                <li>Enter your M-Pesa PIN to complete payment of KES {total}.</li>
                <li>Your physical copy will be dispatched immediately.</li>
              </ol>
            </div>

            <div className="space-y-3 pt-2">
              <button
                disabled={isProcessing}
                onClick={handleTriggerMpesa}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending M-Pesa Prompt to {phone}...</span>
                  </>
                ) : (
                  <>
                    <span>Send M-Pesa Prompt (KES {total})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="relative text-center my-3">
                <span className="text-[11px] font-bold text-slate-400 bg-white px-2 relative z-10">OR ORDER DIRECTLY</span>
                <div className="absolute top-1/2 left-0 right-0 border-t border-slate-200 -z-0" />
              </div>

              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Confirm Order via WhatsApp (Direct Chat)</span>
              </button>

              <button
                onClick={() => setStep('details')}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-600 py-1"
              >
                ← Back to Delivery Details
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Screen */}
        {step === 'success' && (
          <div className="mt-4 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Order Confirmed & Received!
            </span>

            <h3 className="text-2xl font-black text-slate-900 mt-3">
              Thank You, {fullName.split(' ')[0]}!
            </h3>

            <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto">
              Your physical book package is being packaged in Nairobi.
            </p>

            {/* Order Box */}
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Order Reference:</span>
                <span className="font-bold text-slate-900 font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Destination:</span>
                <span className="font-semibold text-slate-800">{address}, {county}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Delivery Service:</span>
                <span className="font-semibold text-slate-800">{delivery.name}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-bold text-emerald-700">{delivery.timeframe}</span>
              </div>
            </div>

            {/* Direct WhatsApp follow-up */}
            <div className="mt-6">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(`Hi Deborah! I just placed order ${orderId} on the ColourWhirl website. Looking forward to receiving my books!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Chat with Deborah on WhatsApp about your Order</span>
              </a>

              <button
                onClick={onClose}
                className="mt-3 text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                Return to Shop
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
