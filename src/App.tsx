import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookCatalog } from './components/BookCatalog';
import { LookInsideModal } from './components/LookInsideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WhyPhysical } from './components/WhyPhysical';
import { WellnessFeature } from './components/WellnessFeature';
import { AboutBrand } from './components/AboutBrand';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { BOOKS, DELIVERY_OPTIONS } from './data/books';
import { Book, CartItem } from './types';

export const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [previewBookId, setPreviewBookId] = useState<string | null>(null);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>(DELIVERY_OPTIONS[0].id);

  // Cart Handlers
  const handleAddToCart = (book: Book) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (bookId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.book.id === bookId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (bookId: string) => {
    setCartItems(prev => prev.filter(item => item.book.id !== bookId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleDirectOrder = (book: Book) => {
    handleAddToCart(book);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activePreviewBook = BOOKS.find(b => b.id === previewBookId) || null;
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Sticky Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToCatalog={handleScrollToCatalog}
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          onScrollToCatalog={handleScrollToCatalog}
          onPreviewBook={(id) => setPreviewBookId(id)}
        />

        {/* Physical Books Catalog */}
        <BookCatalog
          onAddToCart={handleAddToCart}
          onPreviewBook={(id) => setPreviewBookId(id)}
          onDirectOrder={handleDirectOrder}
        />

        {/* Deep Dive into Flagship Wellness Journal */}
        <WellnessFeature
          onPreviewBook={(id) => setPreviewBookId(id)}
          onAddToCart={handleAddToCart}
        />

        {/* Why Choose Physical Print */}
        <WhyPhysical />

        {/* Brand Story, Deborah Marege & Contact */}
        <AboutBrand />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Look Inside Modal */}
      <LookInsideModal
        book={activePreviewBook}
        onClose={() => setPreviewBookId(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        selectedDeliveryId={selectedDeliveryId}
        onSelectDelivery={setSelectedDeliveryId}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Physical Delivery & M-Pesa Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        selectedDeliveryId={selectedDeliveryId}
        onClearCart={handleClearCart}
      />
    </div>
  );
};
export default App;
