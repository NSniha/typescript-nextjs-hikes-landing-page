export type Difficulty = "Easy" | "Moderate" | "Challenging";

export type Trail = {
  id: string;
  name: string;
  location: string;
  image: string;
  distance: number;
  duration: string;
  elevation: number;
  difficulty: Difficulty;
  rating: number;
  reviews: number;
  author: string;
  categories: string[];
  description: string;
};

export const trails: Trail[] = [
  {
    id: "misty-ridge",
    name: "Misty Ridge Trail",
    location: "Dolomites, Italy",
    image: "/images/trails/misty-ridge.jpg",
    distance: 8.4,
    duration: "3 h 20 min",
    elevation: 540,
    difficulty: "Moderate",
    rating: 4.9,
    reviews: 128,
    author: "Alex Morgan",
    categories: ["scenic-views", "challenging"],
    description:
      "Follow a ribbon of trail through wide alpine meadows and into the quiet of the mountains. The climb opens up to layered ridgelines, little wildflowers, and a view that makes every step worth it.",
  },
  {
    id: "sunset-peak",
    name: "Sunset Peak Loop",
    location: "Geiranger, Norway",
    image: "/images/trails/sunset-peak.jpg",
    distance: 6.2,
    duration: "2 h 45 min",
    elevation: 420,
    difficulty: "Moderate",
    rating: 4.8,
    reviews: 96,
    author: "Jamie Lee",
    categories: ["scenic-views", "pet-friendly"],
    description:
      "A beautiful loop above deep blue water, with rocky viewpoints and plenty of places to pause. Pack a warm layer, take your time, and watch the changing light move across the fjord.",
  },
  {
    id: "eagles-flight",
    name: "Eagle’s Flight",
    location: "Black Forest, Germany",
    image: "/images/trails/eagles-flight.jpg",
    distance: 5.1,
    duration: "1 h 50 min",
    elevation: 180,
    difficulty: "Easy",
    rating: 4.7,
    reviews: 84,
    author: "Sam Rivera",
    categories: ["pet-friendly", "family-trip", "with-kids"],
    description:
      "Trade the noise of the everyday for soft forest paths and a canopy of green. This gentle woodland walk is made for unhurried conversations, curious little explorers, and a picnic beneath the trees.",
  },
  {
    id: "eagles-path",
    name: "Eagle’s Flight Path",
    location: "Highlands, Scotland",
    image: "/images/trails/eagles-path.jpg",
    distance: 9.8,
    duration: "3 h 40 min",
    elevation: 360,
    difficulty: "Moderate",
    rating: 4.8,
    reviews: 113,
    author: "Noah Ellis",
    categories: ["family-trip", "scenic-views"],
    description:
      "Head out across open moorland and rolling green hills. Wide skies, easy company, and a wonderfully wild landscape make this a memorable day outside.",
  },
  {
    id: "skyline-ridge",
    name: "Skyline Ridge Run",
    location: "Chamonix, France",
    image: "/images/trails/skyline-ridge.jpg",
    distance: 12.6,
    duration: "5 h 10 min",
    elevation: 920,
    difficulty: "Challenging",
    rating: 4.9,
    reviews: 147,
    author: "Mia Chen",
    categories: ["challenging", "scenic-views"],
    description:
      "An adventurous day on mountain trails, with snow-dusted peaks and sweeping valley views. A steady climb rewards experienced walkers with a wonderfully expansive ridgeline.",
  },
  {
    id: "ancient-forest",
    name: "Ancient Forest Walk",
    location: "New Forest, England",
    image: "/images/trails/ancient-forest.jpg",
    distance: 4.2,
    duration: "1 h 25 min",
    elevation: 65,
    difficulty: "Easy",
    rating: 4.6,
    reviews: 72,
    author: "Oliver Park",
    categories: [
      "with-kids",
      "pet-friendly",
      "family-trip",
      "historical-sites",
    ],
    description:
      "Wander through an old woodland where every turn feels like a small discovery. With a gentle pace and quiet clearings, this is a lovely little escape for the whole family.",
  },
  {
    id: "moonlit-canyon",
    name: "Moonlit Canyon Trek",
    location: "Atlas Mountains, Morocco",
    image: "/images/trails/moonlit-canyon.jpg",
    distance: 11.3,
    duration: "4 h 30 min",
    elevation: 730,
    difficulty: "Challenging",
    rating: 4.8,
    reviews: 61,
    author: "Ari Brooks",
    categories: ["challenging", "scenic-views"],
    description:
      "Walk into a landscape of quiet canyons and hazy mountain silhouettes. This longer route has a sense of space and solitude that stays with you long after the hike.",
  },
  {
    id: "crystal-lake",
    name: "Crystal Lake Climb",
    location: "Bernese Oberland, Switzerland",
    image: "/images/trails/crystal-lake.jpg",
    distance: 7.8,
    duration: "3 h 15 min",
    elevation: 610,
    difficulty: "Moderate",
    rating: 4.9,
    reviews: 156,
    author: "Ava Wilson",
    categories: ["scenic-views", "family-trip"],
    description:
      "A classic alpine climb to still blue water, tucked between dramatic mountain slopes. Bring your camera and a picnic for a well-earned break at the lakeside.",
  },
  {
    id: "frost-hollow",
    name: "Frost Hollow Way",
    location: "Snowdonia, Wales",
    image: "/images/trails/frost-hollow.jpg",
    distance: 6.9,
    duration: "2 h 50 min",
    elevation: 390,
    difficulty: "Moderate",
    rating: 4.7,
    reviews: 89,
    author: "Theo James",
    categories: ["scenic-views", "pet-friendly"],
    description:
      "A peaceful climb through mountain hollows, opening up to a horizon full of soft ridges. Set off early to catch the gentlest light and enjoy a little quiet above the valley.",
  },
  {
    id: "starlight-summit",
    name: "Starlight Summit Quest",
    location: "Lofoten, Norway",
    image: "/images/trails/starlight-summit.jpg",
    distance: 10.4,
    duration: "4 h 20 min",
    elevation: 870,
    difficulty: "Challenging",
    rating: 4.9,
    reviews: 132,
    author: "Luca Rossi",
    categories: ["challenging", "scenic-views"],
    description:
      "Rocky paths, bright green hillsides, and the feeling of reaching the top of your world. A rewarding summit adventure for hikers who enjoy a little extra challenge.",
  },
  {
    id: "verdant-valley",
    name: "Verdant Valley Voyage",
    location: "Lake District, England",
    image: "/images/trails/verdant-valley.jpg",
    distance: 5.7,
    duration: "2 h 10 min",
    elevation: 260,
    difficulty: "Moderate",
    rating: 4.8,
    reviews: 102,
    author: "Isla Taylor",
    categories: ["pet-friendly", "historical-sites"],
    description:
      "A winding path through golden grasses and the folds of a lovely valley. Follow old walking tracks, stop for the views, and rediscover the pleasure of going a little slower.",
  },
  {
    id: "thunder-falls",
    name: "Thunder Falls Hike",
    location: "Pacific Northwest, USA",
    image: "/images/trails/thunder-falls.jpg",
    distance: 3.8,
    duration: "1 h 20 min",
    elevation: 120,
    difficulty: "Easy",
    rating: 4.7,
    reviews: 118,
    author: "Ella Martin",
    categories: ["with-kids", "family-trip", "pet-friendly"],
    description:
      "Walk beneath towering trees along a soft, fern-lined trail. This easy forest escape is full of little details to discover, from mossy roots to the sound of running water.",
  },
];

export const collections = [
  {
    id: "with-kids",
    title: "With Kids",
    image: "/images/collections/with-kids.jpg",
    subtitle: "Little steps. Big discoveries.",
  },
  {
    id: "pet-friendly",
    title: "Pet Friendly",
    image: "/images/collections/pet-friendly.jpg",
    subtitle: "Good trails for good dogs.",
  },
  {
    id: "family-trip",
    title: "Family Trip",
    image: "/images/collections/family-trip.jpg",
    subtitle: "Make room for everyone.",
  },
  {
    id: "challenging",
    title: "Challenging",
    image: "/images/collections/challenging.jpg",
    subtitle: "Go a little further.",
  },
  {
    id: "scenic-views",
    title: "Scenic Views",
    image: "/images/collections/scenic-views.jpg",
    subtitle: "A new perspective awaits.",
  },
  {
    id: "historical-sites",
    title: "Historical Sites",
    image: "/images/collections/historical-sites.jpg",
    subtitle: "Walk a path with a story.",
  },
];

export const features = [
  {
    title: "Explore Secrets",
    description: "Find hidden trails curated by hikers worldwide.",
    target: "trails",
  },
  {
    title: "Trail Info Instantly",
    description: "Get quick access to trail details, ratings, and reviews.",
    target: "trails",
  },
  {
    title: "Safe Navigation",
    description:
      "Use real-time GPS and offline maps for secure, easy guidance.",
    target: "the-app",
  },
  {
    title: "Community Connection",
    description:
      "Share and discover tips, photos, and trails with fellow hikers.",
    target: "community",
  },
];

export const stats = [
  {
    value: 1000,
    suffix: "+",
    label: "Trails Mapped",
    description:
      "Venture through over a thousand trails meticulously charted and reviewed.",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    description:
      "Hikers consistently rate their trail experiences highly, vowing to return.",
  },
  {
    value: 50,
    suffix: "k",
    label: "Active Users",
    description:
      "Join our vast community of active users, discovering new trails daily.",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Memories Shared",
    description:
      "Users have shared over five thousand photos and stories from their hikes.",
  },
];

export const faqs = [
  {
    question: "How do I find the right hike?",
    answer:
      "Search by trail name, region, or country, then narrow the results by difficulty or collection. Open a trail to compare distance, ascent, and walking time before saving your favorite.",
  },
  {
    question: "Can I save hikes for later?",
    answer:
      "Yes. Tap the bookmark on any trail or use Save hike in the trail details. Your saved list is available from the navigation and is remembered on this device.",
  },
  {
    question: "Do I need an account to explore?",
    answer:
      "No. You can browse, search, and save trails straight away. Create a local explorer profile when you want to personalize your visit.",
  },
  {
    question: "Are maps and app downloads available?",
    answer:
      "The app section previews the planned mobile experience. The current website includes an illustrative route preview. Live navigation, offline maps, and app-store downloads are not connected in this edition.",
  },
];

export type Profile = { name: string; email: string };
