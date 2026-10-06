import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Phone, 
  ShieldCheck, CheckCircle2, Loader2, MapPin, CreditCard, ChevronDown, 
  ChevronUp, Edit3, PackageCheck, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, SavedOrder } from '../types';
import { DELIVERY_OPTIONS, CONTACT_INFO } from '../data/books';
import { saveNewOrder } from '../utils/orderStorage';

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
  const navigate = useNavigate();

  // Jumia-style Step Management (1: Address, 2: Delivery, 3: Payment)
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);

  // Address Inputs (clean, no dummy sample names)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [cityTown, setCityTown] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Delivery & Payment
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>(DELIVERY_OPTIONS[0].id);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'whatsapp' | 'pod'>('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<SavedOrder | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const selectedDelivery = DELIVERY_OPTIONS.find(d => d.id === selectedDeliveryId) || DELIVERY_OPTIONS[0];
  const deliveryFee = items.length > 0 ? selectedDelivery.price : 0;
  const grandTotal = subtotal + deliveryFee;

  // Step 1: Confirm Address
  const handleConfirmAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !phone.trim() || !streetAddress.trim()) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }
    setAddressConfirmed(true);
    setActiveStep(2);
  };

  // Step 2: Confirm Delivery
  const handleConfirmDelivery = () => {
    setDeliveryConfirmed(true);
    setActiveStep(3);
  };

  // Step 3: Final Order Confirmation (Jumia-style checkout completion)
  const handleFinalOrderSubmit = () => {
    setIsProcessing(true);
    const newOrderId = `CW-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const fullAddress = `${streetAddress.trim()}, ${cityTown.trim() ? cityTown.trim() + ', ' : ''}${county}`;

    const orderRecord: SavedOrder = {
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
        county,
        address: fullAddress,
        instructions: deliveryNotes.trim()
      },
      paymentMethod,
      status: 'confirmed',
      timeline: [
        {
          title: 'Order Placed & Confirmed',
          description: 'Your physical order was received by the ColourWhirl Nairobi studio.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          done: true
        },
        {
          title: 'Packed at Nairobi Dispatch Hub',
          description: 'Quality inspection complete. Hand-bound physical copies wrapped in protective packaging.',
          time: 'Estimated within 3 hours',
          done: false
        },
        {
          title: 'Out for Courier Delivery',
          description: `Dispatched via ${selectedDelivery.name}.`,
          time: selectedDelivery.timeframe,
          done: false
        },
        {
          title: 'Delivered to Customer',
          description: `Package arrives at ${fullAddress}.`,
          time: 'Final destination',
          done: false
        }
      ]
    };

    saveNewOrder(orderRecord);

    if (paymentMethod === 'whatsapp') {
      let msg = `Hello Deborah! I just placed an order on the ColourWhirl checkout system:%0A%0A`;
      msg += `*Order ID:* ${newOrderId}%0A`;
      msg += `*Customer:* ${fullName} (${phone})%0A`;
      msg += `*Delivery To:* ${fullAddress}%0A`;
      msg += `*Shipping Service:* ${selectedDelivery.name} (KES ${deliveryFee})%0A%0A`;
      msg += `*Books Ordered:*%0A`;
      items.forEach((item, idx) => {
        msg += `${idx + 1}. *${item.book.title}* x ${item.quantity} = KES ${item.book.price * item.quantity}%0A`;
      });
      msg += `%0A*Total Amount Due:* KES ${grandTotal}%0A`;
      if (deliveryNotes) msg += `*Delivery Notes:* ${deliveryNotes}%0A`;
      msg += `%0APlease share your M-Pesa Till / Paybill number for verification.`;

      window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${msg}`, '_blank');
    }

    setTimeout(() => {
      setIsProcessing(false);
      setCompletedOrder(orderRecord);
      onClearCart();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1800);
  };

  // If order is completed, show Jumia-style Order Confirmation screen with Tracking CTA
  if (completedOrder) {
    return (
      <div className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-8 sm:p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Order Placed Successfully
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4">
            Thank you for your order!
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
            Your physical book order <span className="font-mono font-bold text-slate-900">{completedOrder.id}</span> is confirmed and ready for packing in Nairobi.
          </p>

          {/* Order Details Card */}
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-3">
            <div className="flex justify-between border-b border-slate-200 pb-2.5">
              <span className="text-slate-500">Order Reference:</span>
              <span className="font-bold text-slate-900 font-mono text-sm">{completedOrder.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2.5">
              <span className="text-slate-500">Recipient Name:</span>
              <span className="font-semibold text-slate-900">{completedOrder.customer.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2.5">
              <span className="text-slate-500">Delivery Address:</span>
              <span className="font-semibold text-slate-900">{completedOrder.customer.address}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2.5">
              <span className="text-slate-500">Delivery Method:</span>
              <span className="font-semibold text-slate-900">{completedOrder.deliveryOption.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2.5">
              <span className="text-slate-500">Estimated Arrival:</span>
              <span className="font-bold text-emerald-700">{completedOrder.deliveryOption.timeframe}</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-black">
              <span>Total Amount:</span>
              <span className="text-rose-600">KES {completedOrder.total}</span>
            </div>
          </div>

          {/* Action CTAs: Track Order + WhatsApp */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate(`/track?id=${completedOrder.id}`)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <PackageCheck className="w-5 h-5" />
              <span>Track Your Order Now</span>
            </button>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(`Hi Deborah! Checking on order ${completedOrder.id}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Dispatch</span>
            </a>
          </div>

          <div className="mt-6">
            <Link to="/books" className="text-xs text-slate-500 hover:text-slate-800 font-bold">
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
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Checkout ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete your delivery details and choose your payment method below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Jumia-Style 3-Step Accordion Form */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* ================= STEP 1: CUSTOMER ADDRESS ================= */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            {/* Header bar */}
            <div 
              className={`p-4 sm:p-5 flex items-center justify-between border-b ${
                activeStep === 1 ? 'bg-slate-50/80 border-slate-200' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  addressConfirmed 
                    ? 'bg-emerald-500 text-white' 
                    : activeStep === 1 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-200 text-slate-600'
                }`}>
                  {addressConfirmed ? '✓' : '1'}
                </span>
                <span className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                  1. Delivery Address
                </span>
              </div>

              {addressConfirmed && activeStep !== 1 && (
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Change</span>
                </button>
              )}
            </div>

            {/* Step 1 Content */}
            {activeStep === 1 ? (
              <form onSubmit={handleConfirmAddress} className="p-5 sm:p-6 space-y-4">
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
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
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
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
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
                      placeholder="07... or +254..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      County *
                    </label>
                    <select
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50 font-semibold"
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / Town / Area *
                    </label>
                    <input
                      type="text"
                      required
                      value={cityTown}
                      onChange={(e) => setCityTown(e.target.value)}
                      placeholder="e.g. Westlands / Kilimani / CBD / Ruiru"
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                    />
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
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Delivery Instructions / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Directions or special notes for courier rider"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow transition-all active:scale-95"
                  >
                    Confirm Delivery Address
                  </button>
                </div>
              </form>
            ) : addressConfirmed ? (
              <div className="p-4 sm:p-5 text-xs text-slate-700 flex items-start justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {firstName} {lastName} ({phone})
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    {streetAddress}, {cityTown ? cityTown + ', ' : ''}{county}
                  </div>
                  {deliveryNotes && (
                    <div className="text-slate-400 italic text-[11px] mt-1">
                      Note: {deliveryNotes}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* ================= STEP 2: DELIVERY METHOD ================= */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div 
              className={`p-4 sm:p-5 flex items-center justify-between border-b ${
                activeStep === 2 ? 'bg-slate-50/80 border-slate-200' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  deliveryConfirmed 
                    ? 'bg-emerald-500 text-white' 
                    : activeStep === 2 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-200 text-slate-600'
                }`}>
                  {deliveryConfirmed ? '✓' : '2'}
                </span>
                <span className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                  2. Delivery Method
                </span>
              </div>

              {deliveryConfirmed && activeStep !== 2 && (
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Change</span>
                </button>
              )}
            </div>

            {activeStep === 2 ? (
              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-xs text-slate-500 font-medium">
                  Select how you would like to receive your physical books in Kenya:
                </p>

                <div className="space-y-3">
                  {DELIVERY_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                        selectedDeliveryId === opt.id
                          ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryOption"
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
                          Estimated Delivery: {opt.timeframe}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={handleConfirmDelivery}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow transition-all active:scale-95"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            ) : deliveryConfirmed ? (
              <div className="p-4 sm:p-5 text-xs text-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">
                    {selectedDelivery.name} ({selectedDelivery.price === 0 ? 'FREE' : `KES ${selectedDelivery.price}`})
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    Estimated Time: {selectedDelivery.timeframe}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* ================= STEP 3: PAYMENT METHOD ================= */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div 
              className={`p-4 sm:p-5 flex items-center justify-between border-b ${
                activeStep === 3 ? 'bg-slate-50/80 border-slate-200' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  activeStep === 3 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-200 text-slate-600'
                }`}>
                  3
                </span>
                <span className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                  3. Payment Method
                </span>
              </div>
            </div>

            {activeStep === 3 && (
              <div className="p-5 sm:p-6 space-y-5">
                <div className="space-y-3">
                  {/* M-Pesa Option */}
                  <label
                    className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                      paymentMethod === 'mpesa'
                        ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mpesa"
                      checked={paymentMethod === 'mpesa'}
                      onChange={() => setPaymentMethod('mpesa')}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                          <span className="bg-emerald-600 text-white font-black text-[10px] px-2 py-0.5 rounded">M-PESA</span>
                          <span>Lipa Na M-Pesa (STK Push)</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        An instant payment prompt for <strong>KES {grandTotal}</strong> will be sent to <strong>{phone || 'your phone'}</strong>. Enter your M-Pesa PIN on your phone to complete order.
                      </p>
                    </div>
                  </label>

                  {/* WhatsApp Option */}
                  <label
                    className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                      paymentMethod === 'whatsapp'
                        ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="whatsapp"
                      checked={paymentMethod === 'whatsapp'}
                      onChange={() => setPaymentMethod('whatsapp')}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-emerald-600" />
                          <span>Order & Confirm via WhatsApp</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Instantly sends your itemized order and delivery address to Deborah Marege ({CONTACT_INFO.phone}) on WhatsApp for immediate dispatch confirmation.
                      </p>
                    </div>
                  </label>

                  {/* Pay on Delivery Option */}
                  <label
                    className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                      paymentMethod === 'pod'
                        ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pod"
                      checked={paymentMethod === 'pod'}
                      onChange={() => setPaymentMethod('pod')}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        Pay on Pickup / Delivery (Nairobi CBD)
                      </span>
                      <p className="text-xs text-slate-500 mt-1">
                        Pay upon receiving and inspecting your package at the Nairobi station.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Final Confirm Order CTA Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleFinalOrderSubmit}
                    className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Order (KES {grandTotal})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    By confirming, you agree to receive physical delivery in Kenya.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Items in Bag List */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span>Items in your Order ({items.length})</span>
              <Link to="/books" className="text-amber-600 hover:underline">
                Add More Books
              </Link>
            </h3>

            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.book.id} className="py-3 flex items-center gap-4">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-12 h-16 object-cover rounded-md book-shadow shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.book.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 block">
                      {item.book.pages} Pages • Physical Paperback
                    </span>
                    <span className="text-xs font-black text-slate-900 mt-0.5 block">
                      KES {item.book.price * item.quantity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => onUpdateQuantity(item.book.id, -1)}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold">{item.quantity}</span>
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
                      title="Remove book"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Order Summary & Trust Seals (Jumia style) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-5 sm:p-6 space-y-4 sticky top-24">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900">KES {subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span className="font-bold text-slate-900">
                  {deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-950 pt-3 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-rose-600">KES {grandTotal}</span>
              </div>
            </div>

            {/* Jumia-Style Buyer Protection Badges */}
            <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block text-[11px]">Physical Quality Guaranteed</span>
                  Thick 120–140 GSM woodfree artist paper. No marker bleed-through.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block text-[11px]">Nairobi & Countrywide Dispatch</span>
                  Inspected before departure. Tracking code sent with order.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block text-[11px]">Safaricom M-Pesa Verified</span>
                  Direct STK push to your mobile phone.
                </div>
              </div>
            </div>

            {/* Quick Track Existing Order link */}
            <div className="pt-3 border-t border-slate-100 text-center">
              <Link to="/track" className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1">
                <PackageCheck className="w-3.5 h-3.5" />
                <span>Already ordered? Track your package here</span>
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
