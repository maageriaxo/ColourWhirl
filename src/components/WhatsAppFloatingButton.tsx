import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data/books';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Hello ColourWhirl! I want to order physical colouring books.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-emerald-600/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="hidden sm:inline font-bold text-xs">
          Order on WhatsApp
        </span>
      </a>
    </aside>
  );
};
