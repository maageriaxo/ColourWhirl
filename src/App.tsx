import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LookInsideModal } from './components/LookInsideModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HomePage } from './pages/HomePage';
import { BooksPage } from './pages/BooksPage';
import { WellnessPage } from './pages/WellnessPage';
import { WhyPhysicalPage } from './pages/WhyPhysicalPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { BOOKS } from './data/books';
import { Book, CartItem } from './types';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cw_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [previewBookId, setPreviewBookId] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cw_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

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
            const nextQ = item.quantity + delta;
            return nextQ > 0 ? { ...item, quantity: nextQ } : null;
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

  const activePreviewBook = BOOKS.find(b => b.id === previewBookId) || null;
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
        
        {/* Multi-page Navbar */}
        <Navbar cartCount={totalCartCount} />

        {/* Page Content Routes */}
        <main className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  onAddToCart={handleAddToCart} 
                  onPreviewBook={setPreviewBookId} 
                />
              } 
            />
            <Route 
              path="/books" 
              element={
                <BooksPage 
                  onAddToCart={handleAddToCart} 
                  onPreviewBook={setPreviewBookId} 
                />
              } 
            />
            <Route 
              path="/wellness" 
              element={
                <WellnessPage 
                  onAddToCart={handleAddToCart} 
                  onPreviewBook={setPreviewBookId} 
                />
              } 
            />
            <Route 
              path="/why-physical" 
              element={<WhyPhysicalPage />} 
            />
            <Route 
              path="/about" 
              element={<AboutPage />} 
            />
            <Route 
              path="/contact" 
              element={<ContactPage />} 
            />
            <Route 
              path="/cart" 
              element={
                <CartPage 
                  items={cartItems} 
                  onUpdateQuantity={handleUpdateQuantity} 
                  onRemoveItem={handleRemoveItem} 
                  onClearCart={handleClearCart} 
                />
              } 
            />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Direct WhatsApp Action Button */}
        <WhatsAppFloatingButton />

        {/* Global Look Inside Modal */}
        <LookInsideModal
          book={activePreviewBook}
          onClose={() => setPreviewBookId(null)}
          onAddToCart={handleAddToCart}
        />

      </div>
    </BrowserRouter>
  );
};

export default App;
