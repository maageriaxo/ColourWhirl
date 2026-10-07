import { Book, DeliveryOption } from '../types';
import { getAssetUrl } from '../utils/assets';

const RAW_BOOKS: Book[] = [
  {
    id: 'travel-and-tranquil',
    title: 'Adults Colouring Book — Travel & Tranquil',
    subtitle: '40 Pages of Mindful World Escapes & Intricate Scenic Landmarks',
    category: 'adult',
    categoryLabel: 'Adults Colouring Books',
    price: 350,
    originalPrice: 450,
    pages: 40,
    description: 'Designed specifically for adults seeking stress relief, creative decompression, and mindful escape. Journey through 40 intricately drawn world destinations—including the Nairobi city skyline, Paris sidewalk cafes, the Pyramids of Egypt, Tokyo pagodas, Rome Colosseum, Taj Mahal, and peaceful garden waterfalls.',
    coverImage: '/images/travel___tranquil/page_1.jpg',
    sampleImages: [
      {
        url: '/images/travel___tranquil/page_5.jpg',
        title: 'Nairobi Skyline, Kenya',
        description: 'Iconic Nairobi landmarks including KICC, Times Tower, and lush Uhuru park greenery.'
      },
      {
        url: '/images/travel___tranquil/page_7.jpg',
        title: 'New York City & Statue of Liberty',
        description: 'Detailed harbor vista with Manhattan skyline and ferries.'
      },
      {
        url: '/images/travel___tranquil/page_9.jpg',
        title: 'Paris, France',
        description: 'Classic Parisian street cafe terrace with the Eiffel Tower rising in the background.'
      },
      {
        url: '/images/travel___tranquil/page_11.jpg',
        title: 'Tokyo Pagoda, Japan',
        description: 'Historic Sensō-ji temple style pagoda paired with the Tokyo Skytree.'
      },
      {
        url: '/images/travel___tranquil/page_15.jpg',
        title: 'The Colosseum, Rome Italy',
        description: 'Ancient Roman stonework and olive tree in deep meditative line art.'
      },
      {
        url: '/images/travel___tranquil/page_17.jpg',
        title: 'Great Pyramids & Sphinx, Egypt',
        description: 'Majestic desert horizon with ancient pyramids and desert caravan.'
      },
      {
        url: '/images/travel___tranquil/page_27.jpg',
        title: 'Taj Mahal, Agra India',
        description: 'Reflective marble pools and symmetric domes designed for color immersion.'
      },
      {
        url: '/images/travel___tranquil/page_31.jpg',
        title: 'Golden Gate Bridge, San Francisco',
        description: 'Towering suspension bridge over the Pacific bay with sailboats.'
      }
    ],
    features: [
      '40 pages of adult-level intricate scenic landscapes & cultural wonders',
      'Proven therapeutic stress relief for busy professionals and creatives',
      'Single-sided backings so ink or pressure never ruins the next illustration',
      'Featuring Nairobi, Paris, Tokyo, New York, Egypt, India, and tranquil gardens',
      'Handy A4 format with durable softcover binding'
    ],
    paperSpec: '120gsm high-opacity bright white sketch stock (pencil, pen & fine-liner friendly)',
    dimensions: 'A4 format (21.0 x 29.7 cm), Physical Paperback',
    badge: 'Adults Bestseller'
  },
  {
    id: 'colourwhirl-wellness',
    title: 'ColourWhirl Wellness Journal',
    subtitle: 'A 60-Page Guided Self-Reflection & Mindful Colouring Journal',
    category: 'wellness',
    categoryLabel: 'Mindfulness & Guided Journals',
    price: 700,
    originalPrice: 850,
    pages: 60,
    description: 'A transformative 60-page guided physical journal for adults. Pairs introspective therapeutic journaling prompts and empowering affirmations (Childhood Roots, Healing Trauma, Self-Care, Resilience, Five-Year Vision, Forgiveness) with intricate floral, scenic, and reflective coloring illustrations.',
    coverImage: '/images/colouewhirl_wellness/page_1.jpg',
    sampleImages: [
      {
        url: '/images/colouewhirl_wellness/page_3.jpg',
        title: 'Childhood Roots & Gentle Sunrise',
        description: 'Golden countryside with farm fence and faithful companion looking toward sunrise.'
      },
      {
        url: '/images/colouewhirl_wellness/page_4.jpg',
        title: 'Self-Awareness & Self-Love',
        description: 'Reflective mirror portrait surrounded by blooming indoor florals and morning skincare ritual.'
      },
      {
        url: '/images/colouewhirl_wellness/page_11.jpg',
        title: 'Inner Magic & Water Lilies',
        description: 'Serene pond fairy floating among blooming lotus flowers, koi fish, and sunlight.'
      },
      {
        url: '/images/colouewhirl_wellness/page_12.jpg',
        title: 'Community, Joy & Connection',
        description: 'Sunlit pool gathering of dear friends laughing and dancing by the coast.'
      },
      {
        url: '/images/colouewhirl_wellness/page_16.jpg',
        title: 'Cozy Sanctuary & Hearth',
        description: 'Fireplace nook with sleeping cat, warm tea, knitted throws, and cozy books.'
      },
      {
        url: '/images/colouewhirl_wellness/page_23.jpg',
        title: 'African Heritage & Core Identity',
        description: 'Dignified portrait celebrating cultural roots, beaded adornments, and homeland skies.'
      }
    ],
    features: [
      '60 thick, artist-grade physical pages that do not bleed',
      '25+ guided life reflection prompts and positive affirmations',
      'Intricate floral, portrait, and tranquil landscape coloring spreads',
      'Ideal companion for morning gratitude, evening journaling, or therapy sessions',
      'Premium velvety soft-touch matte cover'
    ],
    paperSpec: 'Heavyweight 140gsm woodfree paper (suitable for pencils, gel pens & light markers)',
    dimensions: 'A4 format (21.0 x 29.7 cm), Perfect Bound Paperback',
    badge: 'Flagship Journal',
    affirmations: [
      'My past is part of me, but it does not define me.',
      'I am learning to know myself.',
      'My gifts are valuable, and I honour them.',
      'Gratitude lights my path.',
      'I let go of what no longer serves me.',
      'I bend but I do not break.',
      'I am whole. I am enough.'
    ]
  },
  {
    id: 'kids-colour-me',
    title: 'Kids Colour Me! Activity Book',
    subtitle: 'Everyday Wonders, Animals, Chores & Sports (24 Pages)',
    category: 'kids',
    categoryLabel: 'Kids Learning & Play',
    price: 300,
    originalPrice: 400,
    pages: 24,
    description: 'A 24-page hands-on physical activity book designed to teach young kids through color. Covers practical life topics: friendly domestic & wild animals, healthy fruits, vegetables, hygiene habits (washing hands, brushing teeth), fun sports, and helpful home chores.',
    coverImage: '/images/kids_colouring_books/page_1.jpg',
    sampleImages: [
      {
        url: '/images/kids_colouring_books/page_6.jpg',
        title: 'Delicious Fruits & Nutrition',
        description: 'Bold, friendly outlines of mangoes, strawberries, pineapples, avocados, and bananas.'
      },
      {
        url: '/images/kids_colouring_books/page_8.jpg',
        title: 'Domestic Animals on the Farm',
        description: 'Cows, horses, sheep, goats, rabbits, camels, and friendly donkeys.'
      },
      {
        url: '/images/kids_colouring_books/page_9.jpg',
        title: 'Safari & Wild Animals',
        description: 'Hippos, rhinos, lions, monkeys, tigers, and baboons.'
      },
      {
        url: '/images/kids_colouring_books/page_11.jpg',
        title: 'Under the Sea Creatures',
        description: 'Dolphins, sea turtles, octopuses, crabs, and smiling whales.'
      },
      {
        url: '/images/kids_colouring_books/page_17.jpg',
        title: 'Healthy Hygiene Habits',
        description: 'Brushing teeth, washing hands before eating, and taking fresh baths.'
      },
      {
        url: '/images/kids_colouring_books/page_20.jpg',
        title: 'Helpful Chores at Home',
        description: 'Making beds, sweeping, washing utensils, and disposing trash responsibly.'
      }
    ],
    features: [
      '24 thick pages with bold, cheerful outlines designed for small hands',
      'Builds hand-eye coordination, focus, and positive everyday habits',
      'Covers practical everyday concepts that boost vocabulary and confidence',
      'Withstands energetic crayon pressure and coloring pencils',
      'Bright, joyful full-color glossy cover'
    ],
    paperSpec: '100gsm high-durability drawing paper',
    dimensions: 'A4 format (21.0 x 29.7 cm), Physical Paperback',
    badge: 'Kids Top Pick'
  },
  {
    id: 'kids-alphabet-abc',
    title: 'Alphabet ABC Colouring Book',
    subtitle: 'From A to Z: Learn, Colour & Grow (36 Pages)',
    category: 'kids',
    categoryLabel: 'Early Learning & Preschool',
    price: 300,
    originalPrice: 400,
    pages: 36,
    description: 'Every letter tells a story! 36 structured pages guiding preschoolers and early learners from A to Z. Each letter presents 3 distinct recognizable objects to color and pronounce, along with tracing exercises, vowel reviews, and vocabulary builders.',
    coverImage: '/images/kids_book___abc/page_1.jpg',
    sampleImages: [
      {
        url: '/images/kids_book___abc/page_3.jpg',
        title: 'Welcome Poem & Inspiration',
        description: 'Inspirational intro: "From A for Apple to Z for Zebra, each page invites you to colour, learn and imagine."'
      },
      {
        url: '/images/kids_book___abc/page_5.jpg',
        title: 'Letter A — Apple, Ant, Aeroplane',
        description: 'Upper and lower case A with three distinct coloring items.'
      },
      {
        url: '/images/kids_book___abc/page_6.jpg',
        title: 'Letter B — Ball, Banana, Book',
        description: 'Large clear letters and everyday items to reinforce phonics.'
      },
      {
        url: '/images/kids_book___abc/page_7.jpg',
        title: 'Letter C — Cat, Cup, Car',
        description: 'Engaging character art designed to make letter recognition exciting.'
      },
      {
        url: '/images/kids_book___abc/page_8.jpg',
        title: 'Letter D — Dog, Duck, Donut',
        description: 'Playful animal line art and delicious treat.'
      }
    ],
    features: [
      '36 full pages covering all 26 letters of the English alphabet plus vowels',
      'Over 78 distinct vocabulary objects to color and pronounce',
      'Large outline letters ideal for both finger-tracing and crayon coloring',
      'Essential learning companion for Playgroup, PP1, PP2, and Grade 1',
      'Reinforced physical paperback spine'
    ],
    paperSpec: '100gsm crisp white drawing bond paper',
    dimensions: 'A4 format (21.0 x 29.7 cm), Physical Paperback',
    badge: 'Preschool Essential'
  }
];

export const BOOKS: Book[] = RAW_BOOKS.map(b => ({
  ...b,
  coverImage: getAssetUrl(b.coverImage),
  sampleImages: b.sampleImages.map(s => ({
    ...s,
    url: getAssetUrl(s.url)
  }))
}));

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
    description: 'Safe parcel delivery via Fargo Courier, Wells Fargo, or bus parcel pickup to any county across Kenya.'
  },
  {
    id: 'nairobi-cbd-pickup',
    name: 'Free Nairobi CBD Pickup',
    price: 0,
    timeframe: 'Ready in 24 Hours',
    description: 'Collect your order directly from our Nairobi dispatch point at zero delivery cost.'
  }
];

export const CONTACT_INFO = {
  brandName: 'ColourWhirl',
  tagline: 'Whirl your World',
  contactPerson: 'Deborah Marege',
  role: 'Marketing Manager',
  email: 'hello.colourwhirl@gmail.com',
  phone: '+254 180 409 321', // Sole official phone number
  whatsappNumber: '254180409321', // WhatsApp direct format
  location: 'Nairobi, Kenya',
  hours: 'Monday – Saturday: 8:00 AM – 6:00 PM EAT'
};
