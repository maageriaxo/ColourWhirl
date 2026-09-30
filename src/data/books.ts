import { Book, DeliveryOption } from '../types';

export const BOOKS: Book[] = [
  {
    id: 'colourwhirl-wellness',
    title: 'ColourWhirl Wellness',
    subtitle: 'A Guided Self-Reflection & Mindful Colouring Journal',
    category: 'wellness',
    categoryLabel: 'Mindfulness & Wellness',
    price: 700,
    originalPrice: 850,
    pages: 60,
    description: 'A transformative 60-page guided journal combining deep self-reflection prompts and affirmations with soothing, intricate coloring illustrations. Built as a gentle mirror where you can pause, breathe, and meet yourself with compassion.',
    coverImage: '/images/colouewhirl_wellness/page_1.jpg',
    sampleImages: [
      {
        url: '/images/colouewhirl_wellness/page_12.jpg',
        title: 'Gratitude & Joy',
        description: 'Explore what lights your path through reflective questions and serene botanical art.'
      },
      {
        url: '/images/colouewhirl_wellness/page_16.jpg',
        title: 'Self-Awareness & Reflection',
        description: 'Take time to pause and reconnect with your personal inner strength.'
      },
      {
        url: '/images/colouewhirl_wellness/page_17.jpg',
        title: 'Saving Culture & Future Vision',
        description: 'Gentle prompts on building your future step-by-step alongside whimsical artwork.'
      },
      {
        url: '/images/colouewhirl_wellness/page_23.jpg',
        title: 'African Heritage & Identity',
        description: 'Celebrate culture, roots, and embracing your core identity.'
      },
      {
        url: '/images/colouewhirl_wellness/page_28.jpg',
        title: 'Resilience & Hope',
        description: 'Reminders that you bend but do not break, accompanied by scenic outdoor views.'
      }
    ],
    features: [
      '60 high-gsm thick physical pages (bleed-resistant)',
      '25+ guided introspective journal prompts & positive affirmations',
      'Intricate floral, scenic, and reflective coloring illustrations',
      'Ideal for morning mindfulness, evening decompression, or therapy',
      'Soft-touch premium matte cover binding'
    ],
    paperSpec: 'Thick 140gsm artist-grade woodfree paper (suitable for pencils, gel pens & mild markers)',
    dimensions: 'A4 format (21.0 x 29.7 cm), Perfect Bound Paperback',
    badge: 'Best Seller',
    affirmations: [
      'My past is part of me, but it does not define me.',
      'I am learning to know myself.',
      'My gifts are valuable, and I honour them.',
      'Gratitude lights my path.',
      'I let go of what no longer serves me.',
      'I am whole. I am enough.'
    ]
  },
  {
    id: 'travel-and-tranquil',
    title: 'Travel & Tranquil',
    subtitle: 'Scenic Landmarks & Stress-Relief Escapes',
    category: 'adult',
    categoryLabel: 'Adult Stress Relief',
    price: 350,
    originalPrice: 450,
    pages: 40,
    description: 'Pack your bags for calm and colour. A 40-page physical escape journeying through iconic global horizons—from the Nairobi skyline and Paris cafes to the Pyramids of Egypt, Kyoto temples, and tranquil garden hideaways.',
    coverImage: '/images/travel___tranquil/page_1.jpg',
    sampleImages: [
      {
        url: '/images/travel___tranquil/page_5.jpg',
        title: 'Nairobi Skyline, Kenya',
        description: 'Celebrate our home city with iconic architecture and verdant urban greenery.'
      },
      {
        url: '/images/travel___tranquil/page_9.jpg',
        title: 'Paris, France',
        description: 'Classic sidewalk Parisian cafe and the majestic Eiffel Tower.'
      },
      {
        url: '/images/travel___tranquil/page_15.jpg',
        title: 'Colosseum, Rome Italy',
        description: 'Timeless Roman architecture rendered in crisp, meditative detail.'
      },
      {
        url: '/images/travel___tranquil/page_17.jpg',
        title: 'Giza Pyramids, Egypt',
        description: 'Desert wonder with the Sphinx and camel caravan.'
      },
      {
        url: '/images/travel___tranquil/page_27.jpg',
        title: 'Taj Mahal, India',
        description: 'Reflective pools and ornate domes engineered for deep coloring immersion.'
      }
    ],
    features: [
      '40 pages of premium scenic landscapes and cultural wonders',
      'Single-sided backings to protect your colored pages',
      'Features Nairobi, New York, Paris, Tokyo, Rio, and secret garden sanctuaries',
      'Proven stress-relief tool for busy adults, students, and travelers',
      'Durable travel-friendly paperback format'
    ],
    paperSpec: '120gsm high-opacity bright white sketch stock',
    dimensions: 'A4 format (21.0 x 29.7 cm), Saddle Stitch / Paperback',
    badge: 'Popular'
  },
  {
    id: 'kids-colour-me',
    title: 'Colour Me! Kids Activity Book',
    subtitle: 'Everyday Wonders, Animals, Chores & Sports',
    category: 'kids',
    categoryLabel: 'Kids Learning & Play',
    price: 300,
    originalPrice: 400,
    pages: 24,
    description: 'A vibrant 24-page hands-on physical activity book designed to help young minds connect colors to the world around them. Features domestic & wild animals, fruits, hygiene habits, sports, and everyday home activities.',
    coverImage: '/images/kids_colouring_books/page_1.jpg',
    sampleImages: [
      {
        url: '/images/kids_colouring_books/page_6.jpg',
        title: 'Delicious Fruits',
        description: 'Mangoes, strawberries, pineapples, and bananas with bold, easy-to-color outlines.'
      },
      {
        url: '/images/kids_colouring_books/page_8.jpg',
        title: 'Domestic Animals',
        description: 'Friendly farm animals: cows, goats, horses, sheep, and rabbits.'
      },
      {
        url: '/images/kids_colouring_books/page_11.jpg',
        title: 'Water Animals',
        description: 'Dolphins, turtles, friendly whales, and star fish under the sea.'
      },
      {
        url: '/images/kids_colouring_books/page_17.jpg',
        title: 'Good Hygiene Habits',
        description: 'Positive habits made fun: brushing teeth, washing hands, and bathing.'
      },
      {
        url: '/images/kids_colouring_books/page_20.jpg',
        title: 'Helpful Home Chores',
        description: 'Making beds, sweeping, and washing utensils to build responsibility and pride.'
      }
    ],
    features: [
      '24 fun-filled pages with bold, kid-friendly outlines',
      'Develops fine motor skills, focus, and vocabulary',
      'Covers practical everyday life topics (hygiene, healthy foods, sports)',
      'Kid-proof thick pages that withstand crayon pressure and light paints',
      'Bright, joyful full-color glossy cover'
    ],
    paperSpec: '100gsm high-durability paper ideal for wax crayons, colored pencils & paints',
    dimensions: 'A4 format (21.0 x 29.7 cm)',
    badge: 'Kids Favorite'
  },
  {
    id: 'kids-alphabet-abc',
    title: 'Alphabet ABC Colouring Book',
    subtitle: 'From A to Z: Learn, Colour & Grow',
    category: 'kids',
    categoryLabel: 'Early Learning',
    price: 300,
    originalPrice: 400,
    pages: 36,
    description: 'Every letter tells a story! 36 interactive pages guiding early learners from A for Apple to Z for Zebra. Each letter features 3 fun illustrated objects to color and pronounce, plus dedicated vowel and alphabet summary exercises.',
    coverImage: '/images/kids_book___abc/page_1.jpg',
    sampleImages: [
      {
        url: '/images/kids_book___abc/page_3.jpg',
        title: 'Colour and Learn Welcome',
        description: 'Inspirational introduction page inviting kids on a joyful alphabet journey.'
      },
      {
        url: '/images/kids_book___abc/page_4.jpg',
        title: 'Letter A — Apple, Ant, Aeroplane',
        description: 'Clear uppercase & lowercase letter forms with three recognizable objects.'
      },
      {
        url: '/images/kids_book___abc/page_8.jpg',
        title: 'Interactive Vocabulary Pages',
        description: 'Building phonics and word recognition through engaging line art.'
      },
      {
        url: '/images/kids_book___abc/page_9.jpg',
        title: 'Colouring Fun Back Cover',
        description: 'Lively, colorful celebration of growing creativity.'
      }
    ],
    features: [
      '36 structured pages covering full A to Z phonics and vowels',
      '3 relatable illustrated objects per letter (over 78 vocabulary items)',
      'Large outline letters designed for both finger-tracing and coloring',
      'Essential foundation for preschoolers, PP1, PP2, and Grade 1 learners',
      'Reinforced physical spine built for energetic small hands'
    ],
    paperSpec: '100gsm crisp white drawing bond paper',
    dimensions: 'A4 format (21.0 x 29.7 cm)',
    badge: 'Preschool Essential'
  }
];

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'nairobi-express',
    name: 'Nairobi Express Doorstep Delivery',
    price: 250,
    timeframe: 'Same-day or Next-day',
    description: 'Direct courier delivery to your home or office in Nairobi (CBD, Westlands, Kilimani, Karen, Roysambu, Eastlands, etc.).'
  },
  {
    id: 'nairobi-environs',
    name: 'Nairobi Environs (Metropolitan Area)',
    price: 350,
    timeframe: '1 – 2 Business Days',
    description: 'Kiambu, Thika, Ruiru, Rongai, Ngong, Kitengela, Machakos environs.'
  },
  {
    id: 'nationwide-kenya',
    name: 'Upcountry / Nationwide Kenya Courier',
    price: 450,
    timeframe: '2 – 3 Business Days',
    description: 'Safe parcel delivery via Fargo Courier, Wells Fargo, or Easy Coach/Modern Coast parcel pickup to any county in Kenya.'
  },
  {
    id: 'nairobi-cbd-pickup',
    name: 'Free Nairobi CBD Pickup',
    price: 0,
    timeframe: 'Ready in 24 Hours',
    description: 'Collect your order directly from our Nairobi dispatch point at no extra shipping cost.'
  }
];

export const CONTACT_INFO = {
  brandName: 'ColourWhirl',
  tagline: 'Whirl your World',
  contactPerson: 'Deborah Marege',
  role: 'Marketing Manager',
  email: 'hello.colourwhirl@gmail.com',
  phone1: '+254 180 409 321',
  phone2: '+254 768 193 875',
  whatsappNumber: '254768193875', // WhatsApp direct format
  location: 'Nairobi, Kenya',
  hours: 'Monday – Saturday: 8:00 AM – 6:00 PM EAT'
};
