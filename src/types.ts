export interface Book {
  id: string;
  title: string;
  subtitle: string;
  category: 'wellness' | 'adult' | 'kids';
  categoryLabel: string;
  price: number; // in KES
  originalPrice?: number;
  pages: number;
  description: string;
  coverImage: string;
  sampleImages: {
    url: string;
    title: string;
    description?: string;
  }[];
  features: string[];
  paperSpec: string;
  dimensions: string;
  badge?: string;
  affirmations?: string[];
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface DeliveryOption {
  id: string;
  name: string;
  price: number; // KES
  timeframe: string;
  description: string;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  email?: string;
  deliveryOptionId: string;
  county: string;
  areaAddress: string;
  deliveryInstructions?: string;
  paymentMethod: 'mpesa' | 'whatsapp' | 'pod';
}

export interface SavedOrder {
  id: string; // e.g. CW-7489
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryOption: DeliveryOption;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    county: string;
    address: string;
    instructions?: string;
  };
  paymentMethod: 'mpesa' | 'whatsapp' | 'pod';
  status: 'confirmed' | 'processing' | 'dispatched' | 'delivered';
  timeline: {
    title: string;
    description: string;
    time: string;
    done: boolean;
  }[];
}

