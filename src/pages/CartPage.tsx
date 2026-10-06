import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Phone, ShieldCheck, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { DELIVERY_OPTIONS, CONTACT_INFO } from '../data/books';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (bookId: string, delta: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>(DELIVERY_OPTIONS[0].id);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{ id: string; method: string } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const selectedDelivery = DELIVERY_OPTIONS.find(d => d.id === selectedDeliveryId) || DELIVERY_OPTIONS[0];
  const deliveryFee = items.length > 0 ? selectedDelivery.price : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleMpesaOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Please fill in your Full Name, Phone Number, and Delivery Address.');
      return;
    }

    setIsProcessing(true);
    const newOrderId = `CW-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete({ id: newOrderId, method: 'mpesa' });
      onClearCart();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 2200);
  };

  const handleWhatsAppOrder = () => {
    if (!fullName || !phone || !address) {
      alert('Please fill in your Full Name, Phone Number, and Delivery Address first.');
      return;
    }

    const newOrderId = `CW-${Math.floor(1000 + Math.random() * 9000)}`;
    let msg = `Hello Deborah! I am placing an order for ColourWhirl physical books:%0A%0A`;
    msg += `*Order Ref:* ${newOrderId}%0A`;
    msg += `*Customer:* ${fullName} (${phone})%0A`;
    msg += `*Delivery To:* ${address}, ${county}%0A`;
    msg += `*Delivery Zone:* ${selectedDelivery.name} (KES ${deliveryFee})%0A%0A`;
    msg += `*Books Ordered:*%0A`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.book.title}* x ${item.quantity} = KES ${item.book.price * item.quantity}%0A`;
    });
    msg += `%0A*Total Due:* KES ${grandTotal}%0A`;
    if (instructions) msg += `*Notes:* ${instructions}%0A`;
    msg += `%0APlease share payment details for dispatch!`;

    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${msg}`, '_blank');
    setOrderComplete({ id: newOrderId, method: 'whatsapp' });
    onClearCart();
  };

  // Order Success Screen
  if (orderComplete) {
    return (
      <div className="py-16 sm:py-24 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Order Confirmed & Received!
          </span>

          <h2 className="text-3xl font-black text-slate-900 mt-4">
            Thank you, {fullName.split(' ')[0]}!
          </h2>

          <p className="text-sm text-slate-600 mt-2">
            Your physical books are being packed at our Nairobi dispatch hub.
          </p>

          <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Order Reference:</span>
              <span className="font-bold text-slate-900 font-mono text-sm">{orderComplete.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Delivery Address:</span>
              <span className="font-semibold text-slate-800">{address}, {county}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Courier Service:</span>
              <span className="font-semibold text-slate-800">{selectedDelivery.name}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-500">Estimated Delivery:</span>
              <span className="font-bold text-emerald-700">{selectedDelivery.timeframe}</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(`Hi Deborah! Checking on my order ${orderComplete.id}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Chat with Deborah on WhatsApp ({CONTACT_INFO.phone})</span>
            </a>

            <Link
              to="/books"
              className="inline-block text-xs font-bold text-slate-600 hover:text-slate-900 pt-2"
            >
              ← Back to Books Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty Bag
  if (items.length === 0) {
    return (
      <div className="py-20 sm:py-28 max-w-xl mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Your Book Bag is Empty
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
          You haven't selected any books yet. Explore our collection of adults coloring, guided journals, and kids activity books.
        </p>
        <Link
          to="/books"
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all active:scale-95"
        >
          <span>Browse Available Books</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Shopping Bag & Physical Checkout
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your items and provide delivery details for courier dispatch in Kenya.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Items in Bag */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center justify-between">
              <span>Your Selected Books ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
              <span className="text-xs text-rose-600 font-semibold">Physical Editions</span>
            </h2>

            <div className="space-y-6 divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.book.id} className="pt-6 first:pt-0 flex gap-4 sm:gap-6">
                  {/* Thumbnail */}
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-20 sm:w-24 h-28 sm:h-32 object-cover rounded-xl book-shadow shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                            {item.book.categoryLabel}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                            {item.book.title}
                          </h3>
                          <p className="text-xs text-slate-400 italic">
                            {item.book.pages} Pages • Physical Paperback
                          </p>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.book.id)}
                          className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.book.id, -1)}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-black text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.book.id, 1)}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">KES {item.book.price} each</span>
                        <span className="text-lg font-black text-slate-900">
                          KES {item.book.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link to="/books" className="text-rose-600 font-bold hover:underline">
                ← Add more books to bag
              </Link>
              <button
                onClick={onClearCart}
                className="text-slate-400 hover:text-slate-600 font-medium"
              >
                Clear Bag
              </button>
            </div>
          </div>

          {/* Paper & Book Trust badge */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3.5 text-xs text-slate-700">
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold block text-slate-900">Heavyweight Bleed-Proof Stock</span>
              All physical books are printed on 100–140 GSM artist paper, verified before dispatch from Nairobi.
            </div>
          </div>
        </div>

        {/* Right Column: Order & Delivery Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
              Delivery & Payment Details
            </h2>

            <form onSubmit={handleMpesaOrder} className="space-y-4">
              {/* Delivery Destination */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-violet-600" />
                  <span>Delivery Destination (Kenya)</span>
                </label>
                <select
                  value={selectedDeliveryId}
                  onChange={(e) => setSelectedDeliveryId(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {DELIVERY_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name} — KES {opt.price} ({opt.timeframe})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1 italic">
                  {selectedDelivery.description}
                </p>
              </div>

              {/* Customer Inputs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mary Muthoni"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / M-Pesa *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    County *
                  </label>
                  <input
                    type="text"
                    required
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    placeholder="e.g. Nairobi"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estate / Street Address / Town *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Westlands, Parklands Rd, Haven Heights Apt 3C"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Call upon delivery / Send via Fargo courier"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              {/* Price Calculation Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} books)</span>
                  <span className="font-bold text-slate-900">KES {subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-slate-900">
                    {deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>Total Due</span>
                  <span className="text-base text-rose-600">KES {grandTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending M-Pesa STK Prompt...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay with M-Pesa (KES {grandTotal})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Order Directly via WhatsApp ({CONTACT_INFO.phone})</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400 pt-1">
                Security guaranteed • Dispatch confirmed upon payment
              </p>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
