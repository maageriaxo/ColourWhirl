import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Phone } from 'lucide-react';
import { CartItem } from '../types';
import { DELIVERY_OPTIONS, CONTACT_INFO } from '../data/books';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (bookId: string, delta: number) => void;
  onRemoveItem: (bookId: string) => void;
  selectedDeliveryId: string;
  onSelectDelivery: (id: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  selectedDeliveryId,
  onSelectDelivery,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const selectedDelivery = DELIVERY_OPTIONS.find(d => d.id === selectedDeliveryId) || DELIVERY_OPTIONS[0];
  const deliveryFee = items.length > 0 ? selectedDelivery.price : 0;
  const total = subtotal + deliveryFee;

  const generateWhatsAppMessage = () => {
    let msg = `Hello ColourWhirl! I would like to order physical books:%0A%0A`;
    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.book.title}* x ${item.quantity} = KES ${item.book.price * item.quantity}%0A`;
    });
    msg += `%0A*Subtotal:* KES ${subtotal}`;
    msg += `%0A*Delivery Zone:* ${selectedDelivery.name} (KES ${deliveryFee})`;
    msg += `%0A*Total Amount:* KES ${total}`;
    msg += `%0A%0APlease let me know your M-Pesa Paybill / Till number for delivery confirmation.`;
    return msg;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg font-bold text-slate-900">Your Book Bag</h2>
              <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Your bag is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Browse our library and choose tangible physical colouring books to inspire yourself or your kids.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow hover:bg-slate-800"
                >
                  Explore Books
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.book.id}
                  className="flex gap-4 p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100 items-center"
                >
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-16 h-20 object-cover rounded-lg book-shadow shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {item.book.title}
                    </h4>
                    <span className="text-xs text-slate-500 block">
                      Physical Edition ({item.book.pages} pages)
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 mt-1 block">
                      KES {item.book.price * item.quantity}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.book.id, -1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.book.id, 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.book.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors ml-auto"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Section (if items exist) */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50/70 space-y-4">
              
              {/* Delivery Zone Selector */}
              <div>
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <Truck className="w-4 h-4 text-violet-600" />
                  <span>Choose Delivery Destination (Kenya):</span>
                </label>
                <select
                  value={selectedDeliveryId}
                  onChange={(e) => onSelectDelivery(e.target.value)}
                  className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
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

              {/* Cost Summary */}
              <div className="space-y-1.5 pt-3 border-t border-slate-200/80 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Books Subtotal</span>
                  <span className="font-semibold text-slate-900">KES {subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Physical Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-base text-rose-600">KES {total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={onProceedCheckout}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-700 hover:to-rose-700 text-white font-bold text-sm shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>M-Pesa Physical Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Instant Order on WhatsApp</span>
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
