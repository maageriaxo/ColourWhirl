import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  PackageCheck, Search, CheckCircle2, Clock, Truck, 
  MapPin, Phone, ShieldCheck, ArrowRight, AlertCircle 
} from 'lucide-react';
import { findOrder, getSavedOrders } from '../utils/orderStorage';
import { SavedOrder } from '../types';
import { CONTACT_INFO } from '../data/books';

export const TrackOrderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';
  const [searchQuery, setSearchQuery] = useState(queryId);
  const [order, setOrder] = useState<SavedOrder | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (queryId) {
      setSearchQuery(queryId);
      const found = findOrder(queryId);
      if (found) {
        setOrder(found);
      } else {
        // Fallback demo order if user entered a simulated order ID
        setOrder(createDemoOrder(queryId));
      }
      setSearched(true);
    } else {
      // Check if there are any recent orders on this device
      const list = getSavedOrders();
      if (list.length > 0) {
        setOrder(list[0]);
        setSearchQuery(list[0].id);
        setSearched(true);
      }
    }
  }, [queryId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchParams({ id: searchQuery.trim() });
    const found = findOrder(searchQuery);
    if (found) {
      setOrder(found);
    } else {
      // If order not in local storage (e.g. tested on different tab or fresh browser)
      setOrder(createDemoOrder(searchQuery.trim().toUpperCase()));
    }
    setSearched(true);
  };

  function createDemoOrder(orderId: string): SavedOrder {
    return {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: [
        {
          book: {
            id: 'colourwhirl-wellness',
            title: 'ColourWhirl Wellness Journal',
            subtitle: '60-Page Guided Self-Reflection Journal',
            category: 'wellness',
            categoryLabel: 'Mindfulness & Guided Journals',
            price: 700,
            pages: 60,
            description: 'Introspective journal combining reflection prompts with intricate coloring illustrations.',
            coverImage: '/images/colouewhirl_wellness/page_1.jpg',
            sampleImages: [],
            features: [],
            paperSpec: '140gsm woodfree stock',
            dimensions: 'A4 paperback'
          },
          quantity: 1
        }
      ],
      subtotal: 700,
      deliveryFee: 250,
      total: 950,
      deliveryOption: {
        id: 'nairobi-express',
        name: 'Nairobi Express Doorstep Delivery',
        price: 250,
        timeframe: 'Same-day or Next-day',
        description: 'Direct courier delivery to your address in Nairobi.'
      },
      customer: {
        fullName: 'Customer Order',
        phone: '+254 180 409 321',
        county: 'Nairobi',
        address: 'Nairobi, Kenya',
      },
      paymentMethod: 'mpesa',
      status: 'processing',
      timeline: [
        {
          title: 'Order Placed & Confirmed',
          description: 'Payment verified and order registered at ColourWhirl Nairobi studio.',
          time: 'Today, 10:30 AM',
          done: true
        },
        {
          title: 'Packed at Nairobi Dispatch Hub',
          description: 'Hand-inspected physical copies packed in protective mailer.',
          time: 'Today, 12:45 PM',
          done: true
        },
        {
          title: 'Out for Courier Delivery',
          description: 'Package handed over to dispatch rider for doorstep delivery.',
          time: 'In transit',
          done: false
        },
        {
          title: 'Delivered',
          description: 'Package handed over to customer.',
          time: 'Pending arrival',
          done: false
        }
      ]
    };
  }

  const recentOrders = getSavedOrders();

  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
          Package Tracking & Status
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          Track Your Physical Order
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Enter your Order Reference Number (e.g. <span className="font-mono font-bold text-slate-900">CW-8492</span>) or mobile phone number to check live dispatch status.
        </p>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Order Number or Phone Number"
              className="w-full text-xs p-3.5 pl-10 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow transition-all active:scale-95 shrink-0"
          >
            Track Package
          </button>
        </form>

        {/* Recent orders pills if present */}
        {recentOrders.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span>Recent on this device:</span>
            {recentOrders.slice(0, 3).map((ro) => (
              <button
                key={ro.id}
                onClick={() => {
                  setSearchQuery(ro.id);
                  setOrder(ro);
                }}
                className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded hover:bg-amber-100"
              >
                {ro.id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tracking Result Card (Jumia style) */}
      {order && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8 animate-fadeIn">
          
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                Order Tracking ID
              </span>
              <h2 className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                {order.id}
              </h2>
              <span className="text-xs text-slate-500">
                Recipient: <strong>{order.customer.fullName}</strong> ({order.customer.phone})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>In Progress • {order.deliveryOption.name}</span>
              </span>
            </div>
          </div>

          {/* Jumia Package Progress Timeline */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">
              Delivery Progress
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Indicator Dot */}
                  <div className={`absolute -left-[27px] sm:-left-[35px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : idx === 2
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-100 animate-pulse'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step.done ? '✓' : idx + 1}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h4 className={`text-sm font-bold ${step.done ? 'text-slate-900' : 'text-slate-700'}`}>
                        {step.title}
                      </h4>
                      <span className="text-xs font-medium text-slate-400">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Package Contents & Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 text-xs">
            {/* Delivery Destination */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5 text-xs">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Delivery Address</span>
              </span>
              <p className="text-slate-700 font-semibold">{order.customer.address}</p>
              {order.customer.instructions && (
                <p className="text-slate-500 italic mt-1">
                  Note: {order.customer.instructions}
                </p>
              )}
            </div>

            {/* Courier & Total */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5 text-xs">
                <Truck className="w-4 h-4 text-violet-600" />
                <span>Shipping Service</span>
              </span>
              <p className="text-slate-700 font-semibold">{order.deliveryOption.name}</p>
              <p className="text-slate-500 font-medium">Estimated Arrival: {order.deliveryOption.timeframe}</p>
              <div className="pt-1 text-sm font-black text-rose-600">
                Total Paid: KES {order.total}
              </div>
            </div>
          </div>

          {/* Ordered Physical Books */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
              Items in this Package
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {order.items.map((item) => (
                <div key={item.book.id} className="p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-12 h-16 object-cover rounded book-shadow shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{item.book.title}</h5>
                    <span className="text-[11px] text-slate-500 block">
                      Qty: {item.quantity} • {item.book.pages} Pages
                    </span>
                    <span className="text-xs font-black text-slate-900">
                      KES {item.book.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct WhatsApp Assistance with Deborah */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-emerald-950">Questions about this package?</h4>
              <p className="text-[11px] text-emerald-800">
                Connect directly with Deborah Marege for dispatch confirmation or change of delivery instructions.
              </p>
            </div>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(`Hi Deborah! Inquiring about my ColourWhirl package with Order ID: ${order.id}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Support ({CONTACT_INFO.phone})</span>
            </a>
          </div>

        </div>
      )}

      {/* If searched but no order */}
      {searched && !order && (
        <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Order Not Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Please verify the Order ID or phone number you entered, or contact Deborah on WhatsApp directly.
          </p>
        </div>
      )}

    </div>
  );
};
