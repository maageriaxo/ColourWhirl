import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Phone, 
  ShieldCheck, CheckCircle2, Loader2, MapPin, Mail, MessageCircle, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, SavedOrder } from '../types';
import { DELIVERY_OPTIONS, CONTACT_INFO } from '../data/books';
import { saveNewOrder } from '../utils/orderStorage';
import { CustomerProfile } from '../components/AccountModal';

interface CartPageProps {
  items: CartItem[];
  profile: CustomerProfile | null;
  onUpdateQuantity: (bookId: string, delta: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  profile,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  // Address Inputs (clean, no sample dummy names)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [cityTown, setCityTown] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Delivery & Method Selection (all accessible simultaneously)
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>(DELIVERY_OPTIONS[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<SavedOrder | null>(null);

  // Pre-fill from profile if logged in
  useEffect(() => {
    if (profile) {
      const parts = profile.fullName.split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
      setPhone(profile.phone || '');
      setEmail(profile.email || '');
      if (profile.county) setCounty(profile.county);
      if (profile.address) setStreetAddress(profile.address);
    }
  }, [profile]);

  const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const selectedDelivery = DELIVERY_OPTIONS.find(d => d.id === selectedDeliveryId) || DELIVERY_OPTIONS[0];
  const deliveryFee = items.length > 0 ? selectedDelivery.price : 0;
  const grandTotal = subtotal + deliveryFee;

  const validateForm = () => {
    if (!firstName.trim()) {
      alert('Please enter your First Name.');
      return false;
    }
    if (!phone.trim()) {
      alert('Please enter your Mobile Number.');
      return false;
    }
    if (!streetAddress.trim()) {
      alert('Please enter your Delivery Address (Street / Building / Area).');
      return false;
    }
    return true;
  };

  const createOrderRecord = (method: 'whatsapp' | 'email' | 'mpesa'): SavedOrder => {
    const newOrderId = `CW-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const fullAddress = `${streetAddress.trim()}, ${cityTown.trim() ? cityTown.trim() + ', ' : ''}${county}`;

    return {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      items: [...items],
      subtotal,
      deliveryFee,
      total: grandTotal,
      deliveryOption: selectedDelivery,
      customer: {
        fullName,
        phone: phone.trim(),
        email: email.trim(),
        county,
        address: fullAddress,
        instructions: deliveryNotes.trim()
      },
      paymentMethod: method,
      status: 'confirmed',
      timeline: [
        {
          title: 'Order Tailored & Received',
          description: `Received via ${method.toUpperCase()}. Deborah & the team will confirm dispatch.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          done: true
        }
      ]
    };
  };

  // 1. WhatsApp Tailored Order (Primary)
  const handleWhatsAppOrder = () => {
    if (!validateForm()) return;

    const order = createOrderRecord('whatsapp');
    saveNewOrder(order);

    let msg = `*NEW ORDER — ColourWhirl Nairobi*%0A%0A`;
    msg += `*Order Ref:* ${order.id}%0A`;
    msg += `*Customer:* ${order.customer.fullName} (${order.customer.phone})%0A`;
    if (email) msg += `*Email:* ${email}%0A`;
    msg += `*Delivery To:* ${order.customer.address}%0A`;
    msg += `*Delivery Service:* ${selectedDelivery.name} (KES ${deliveryFee})%0A%0A`;
    msg += `*Books Ordered:*%0A`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.book.title}* x ${item.quantity} = KES ${item.book.price * item.quantity}%0A`;
    });
    msg += `%0A*Subtotal:* KES ${subtotal}%0A`;
    msg += `*Delivery Fee:* KES ${deliveryFee}%0A`;
    msg += `*TOTAL DUE:* KES ${grandTotal}%0A`;
    if (deliveryNotes) msg += `%0A*Special Instructions:* ${deliveryNotes}%0A`;
    msg += `%0APlease confirm dispatch timeline and Lipa Na M-Pesa details!`;

    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${msg}`, '_blank');

    setCompletedOrder(order);
    onClearCart();
    confetti({ particleCount: 100, spread: 70 });
  };

  // 2. Email Tailored Order
  const handleEmailOrder = () => {
    if (!validateForm()) return;

    const order = createOrderRecord('email');
    saveNewOrder(order);

    const subject = encodeURIComponent(`[New Book Order ${order.id}] ${order.customer.fullName}`);
    let body = `Hello Deborah and ColourWhirl Publishing Team,\n\n`;
    body += `I would like to order the following physical books:\n\n`;
    items.forEach((item, idx) => {
      body += `${idx + 1}. ${item.book.title} x ${item.quantity} = KES ${item.book.price * item.quantity}\n`;
    });
    body += `\nSubtotal: KES ${subtotal}\n`;
    body += `Delivery Service: ${selectedDelivery.name} (KES ${deliveryFee})\n`;
    body += `TOTAL AMOUNT DUE: KES ${grandTotal}\n\n`;
    body += `Customer Details:\n`;
    body += `Name: ${order.customer.fullName}\n`;
    body += `Phone: ${phone}\n`;
    body += `Delivery Address: ${order.customer.address}\n`;
    if (deliveryNotes) body += `Notes: ${deliveryNotes}\n`;

    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${encodeURIComponent(body)}`;

    setCompletedOrder(order);
    onClearCart();
    confetti({ particleCount: 100, spread: 70 });
  };

  // 3. M-Pesa STK Push Prompt
  const handleMpesaOrder = () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    const order = createOrderRecord('mpesa');
    saveNewOrder(order);

    setTimeout(() => {
      setIsProcessing(false);
      setCompletedOrder(order);
      onClearCart();
      confetti({ particleCount: 120, spread: 80 });
    }, 2000);
  };

  // Completed Confirmation Screen
  if (completedOrder) {
    return (
      <div className="py-16 sm:py-24 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-8 sm:p-12">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Order Dispatched to Publishing Desk
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4">
            Thank you, {completedOrder.customer.fullName.split(' ')[0]}!
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
            Your order <span className="font-mono font-bold text-slate-900">{completedOrder.id}</span> has been communicated to Deborah Marege. We tailor and inspect every copy before dispatch.
          </p>

          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2.5">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Order Reference:</span>
              <span className="font-bold text-slate-900 font-mono text-sm">{completedOrder.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Recipient Name:</span>
              <span className="font-semibold text-slate-900">{completedOrder.customer.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Delivery Address:</span>
              <span className="font-semibold text-slate-900">{completedOrder.customer.address}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Delivery Method:</span>
              <span className="font-semibold text-slate-900">{completedOrder.deliveryOption.name}</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-black">
              <span>Total Amount:</span>
              <span className="text-rose-600">KES {completedOrder.total}</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(`Hi Deborah! Following up on my order ${completedOrder.id}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Chat with Deborah on WhatsApp ({CONTACT_INFO.phone})</span>
            </a>

            <Link
              to="/books"
              className="inline-block text-xs font-bold text-slate-600 hover:text-slate-900 pt-2"
            >
              ← Return to Books Store
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
          Your Shopping Bag is Empty
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
          Explore our collection of physical books for adults and children, and add your favorites to checkout.
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
    <div className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Checkout & Order Tailoring
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Provide your delivery details and choose how you would like to tailor your order with us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: All 3 Sections Fully Accessible Simultaneously */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* SECTION 1: Customer & Delivery Address */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                  1
                </span>
                <h2 className="font-black text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                  Customer & Delivery Address
                </h2>
              </div>
              {profile && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Pre-filled from Account
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (M-Pesa / Delivery Rider) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile Number (07...)"
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    County *
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50 font-semibold"
                  >
                    <option value="Nairobi">Nairobi</option>
                    <option value="Kiambu">Kiambu</option>
                    <option value="Machakos">Machakos</option>
                    <option value="Kajiado">Kajiado</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Uasin Gishu">Uasin Gishu (Eldoret)</option>
                    <option value="Other County">Other County (Kenya)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Town / Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={cityTown}
                    onChange={(e) => setCityTown(e.target.value)}
                    placeholder="City or Town (e.g. Westlands / Kilimani)"
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Street / Estate / Building / House No. *
                </label>
                <input
                  type="text"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="Street address, building, apartment"
                  className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Delivery Instructions / Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Directions or specific notes for courier rider"
                  className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Delivery Method (Accessible simultaneously) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                2
              </span>
              <h2 className="font-black text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                Delivery Method (Kenya)
              </h2>
            </div>

            <div className="space-y-3">
              {DELIVERY_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    selectedDeliveryId === opt.id
                      ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={opt.id}
                    checked={selectedDeliveryId === opt.id}
                    onChange={() => setSelectedDeliveryId(opt.id)}
                    className="mt-1 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        {opt.name}
                      </span>
                      <span className="font-black text-xs sm:text-sm text-slate-900">
                        {opt.price === 0 ? 'FREE' : `KES ${opt.price}`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {opt.description}
                    </p>
                    <span className="inline-block mt-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Timeline: {opt.timeframe}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* SECTION 3: Order Tailoring & Placement Channels (Accessible simultaneously) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                3
              </span>
              <div>
                <h2 className="font-black text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                  Tailor & Place Your Order
                </h2>
                <p className="text-xs text-slate-500">
                  Connect directly with Deborah Marege to tailor packaging, timing, and confirm payment.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {/* WhatsApp Tailored Order Button (Primary) */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2.5 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Place & Tailor Order via WhatsApp (KES {grandTotal})</span>
              </button>
              <p className="text-[11px] text-center text-slate-500">
                Recommended: Pre-fills your entire order ticket directly to Deborah ({CONTACT_INFO.phone}) on WhatsApp.
              </p>

              <div className="relative text-center my-3">
                <span className="text-[11px] font-bold text-slate-400 bg-white px-2 relative z-10">OTHER ORDER OPTIONS</span>
                <div className="absolute top-1/2 left-0 right-0 border-t border-slate-200 -z-0" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email Order Button */}
                <button
                  type="button"
                  onClick={handleEmailOrder}
                  className="py-3.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>Send Order via Email</span>
                </button>

                {/* Instant M-Pesa STK Push */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleMpesaOrder}
                  className="py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending M-Pesa Prompt...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay via M-Pesa Prompt</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Selected Books Breakdown */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-7 space-y-5 sticky top-24">
            <h2 className="text-base font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-rose-600 font-bold">Physical Editions</span>
            </h2>

            {/* Selected Items Mini List */}
            <div className="space-y-3 max-h-64 overflow-y-auto divide-y divide-slate-100 pr-1">
              {items.map((item) => (
                <div key={item.book.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-12 h-16 object-cover rounded-lg book-shadow shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.book.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 block">
                      {item.book.pages} pgs • KES {item.book.price} each
                    </span>
                    <span className="text-xs font-black text-slate-900 mt-0.5 block">
                      KES {item.book.price * item.quantity}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => onUpdateQuantity(item.book.id, -1)}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-1.5 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.book.id, 1)}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.book.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900">KES {subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping ({selectedDelivery.name})</span>
                <span className="font-bold text-slate-900">
                  {deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-950 pt-3 border-t border-slate-200">
                <span>Total Amount Due</span>
                <span className="text-rose-600">KES {grandTotal}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-[11px]">120–140 GSM thick paper, hand-inspected in Nairobi.</span>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-[11px]">Direct courier delivery or CBD collection.</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link to="/books" className="text-xs text-slate-500 hover:text-slate-800 font-bold">
                ← Add More Books to Bag
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
