export type Category =
  | "Academic Books"
  | "Electronics"
  | "Academic Tools"
  | "Hostel Essentials"
  | "Stationery"
  | "Career Resources";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  badge?: string;
  // visual: gradient + icon name
  gradient: string;
  icon: string;
}

const g = {
  indigo: "from-indigo-500/30 via-violet-500/20 to-fuchsia-500/30",
  emerald: "from-emerald-500/30 via-teal-500/20 to-cyan-500/30",
  amber: "from-amber-500/30 via-orange-500/20 to-rose-500/30",
  sky: "from-sky-500/30 via-blue-500/20 to-indigo-500/30",
  rose: "from-rose-500/30 via-pink-500/20 to-violet-500/30",
  lime: "from-lime-500/30 via-emerald-500/20 to-teal-500/30",
};

export const PRODUCTS: Product[] = [
  // Academic Books
  { id: "p1", name: "Engineering Mathematics", description: "Comprehensive guide covering calculus, linear algebra, and differential equations for engineering students.", category: "Academic Books", price: 549, originalPrice: 799, rating: 4.7, reviews: 1240, stock: 45, badge: "Bestseller", gradient: g.indigo, icon: "BookOpen" },
  { id: "p2", name: "Physics for Engineers", description: "Modern physics fundamentals tailored for first-year engineering curricula.", category: "Academic Books", price: 489, originalPrice: 699, rating: 4.6, reviews: 890, stock: 32, gradient: g.sky, icon: "Atom" },
  { id: "p3", name: "Chemistry Essentials", description: "Engineering chemistry with practical experiments and real-world applications.", category: "Academic Books", price: 459, originalPrice: 649, rating: 4.5, reviews: 612, stock: 28, gradient: g.lime, icon: "FlaskConical" },
  { id: "p4", name: "DSA Master Guide", description: "Crack coding interviews with this complete data structures & algorithms handbook.", category: "Academic Books", price: 699, originalPrice: 999, rating: 4.9, reviews: 3210, stock: 67, badge: "Hot", gradient: g.rose, icon: "Binary" },
  { id: "p5", name: "DBMS Complete", description: "Database management systems from fundamentals to advanced query optimization.", category: "Academic Books", price: 579, originalPrice: 849, rating: 4.7, reviews: 1450, stock: 41, gradient: g.emerald, icon: "Database" },
  { id: "p6", name: "Operating Systems", description: "Galvin-style OS concepts with modern Linux examples and case studies.", category: "Academic Books", price: 619, originalPrice: 899, rating: 4.6, reviews: 980, stock: 22, gradient: g.amber, icon: "Cpu" },

  // Electronics
  { id: "p7", name: "Student Pro Laptop 14\"", description: "Lightweight 14-inch laptop with 16GB RAM, 512GB SSD, perfect for coding and design.", category: "Electronics", price: 54999, originalPrice: 69999, rating: 4.8, reviews: 2140, stock: 18, badge: "Top Pick", gradient: g.indigo, icon: "Laptop" },
  { id: "p8", name: "Mechanical Keyboard RGB", description: "Hot-swappable mechanical keyboard with tactile switches and stunning RGB lighting.", category: "Electronics", price: 4299, originalPrice: 6499, rating: 4.7, reviews: 1820, stock: 56, gradient: g.rose, icon: "Keyboard" },
  { id: "p9", name: "Wireless Precision Mouse", description: "Ergonomic wireless mouse with 70-day battery life and silent click.", category: "Electronics", price: 1499, originalPrice: 2299, rating: 4.6, reviews: 2310, stock: 89, gradient: g.sky, icon: "Mouse" },
  { id: "p10", name: "Studio Headphones Pro", description: "Active noise-cancelling over-ear headphones with 40-hour battery.", category: "Electronics", price: 3999, originalPrice: 5999, rating: 4.8, reviews: 3450, stock: 44, badge: "Best Audio", gradient: g.rose, icon: "Headphones" },
  { id: "p11", name: "Monitor Light Bar", description: "Eye-care LED screen bar with auto-dimming, perfect for late-night study sessions.", category: "Electronics", price: 2199, originalPrice: 3499, rating: 4.5, reviews: 670, gradient: g.amber, stock: 38, icon: "Lightbulb" },
  { id: "p12", name: "27\" 2K Monitor", description: "Crisp 2K IPS display with 100Hz refresh rate and USB-C input.", category: "Electronics", price: 18999, originalPrice: 24999, rating: 4.7, reviews: 540, gradient: g.emerald, stock: 12, icon: "Monitor" },
  { id: "p13", name: "Power Bank 20000mAh", description: "Fast-charging power bank with USB-C PD, charges laptop and phone simultaneously.", category: "Electronics", price: 1899, originalPrice: 2799, rating: 4.6, reviews: 1230, gradient: g.lime, stock: 76, icon: "BatteryCharging" },
  { id: "p14", name: "USB-C Hub 7-in-1", description: "Expand your laptop with HDMI, SD card, and 3 USB ports in one sleek hub.", category: "Electronics", price: 1299, originalPrice: 1999, rating: 4.5, reviews: 890, gradient: g.sky, stock: 65, icon: "Usb" },

  // Academic Tools
  { id: "p15", name: "Scientific Calculator FX-991", description: "991 functions, dual power, exam-approved for engineering and competitive exams.", category: "Academic Tools", price: 1149, originalPrice: 1599, rating: 4.9, reviews: 5670, stock: 120, badge: "#1 Calc", gradient: g.emerald, icon: "Calculator" },
  { id: "p16", name: "Engineering Drawing Kit", description: "Complete drafting set with compass, protractor, set squares, and storage box.", category: "Academic Tools", price: 749, originalPrice: 1199, rating: 4.6, reviews: 980, stock: 54, gradient: g.amber, icon: "Compass" },
  { id: "p17", name: "Lab Coat — Premium Cotton", description: "Full-sleeve white lab coat, breathable cotton, fits all standards.", category: "Academic Tools", price: 599, originalPrice: 899, rating: 4.5, reviews: 320, stock: 88, gradient: g.sky, icon: "Shirt" },
  { id: "p18", name: "Digital Multimeter", description: "Accurate AC/DC measurement with auto-ranging, perfect for EE labs.", category: "Academic Tools", price: 1299, originalPrice: 1899, rating: 4.7, reviews: 540, stock: 33, gradient: g.indigo, icon: "Zap" },
  { id: "p19", name: "Geometry Box Pro", description: "Precision instruments in a magnetic-close metal box.", category: "Academic Tools", price: 349, originalPrice: 549, rating: 4.6, reviews: 780, stock: 110, gradient: g.rose, icon: "Ruler" },
  { id: "p20", name: "Lab Goggles", description: "Anti-fog safety goggles meeting all chemistry lab standards.", category: "Academic Tools", price: 249, originalPrice: 399, rating: 4.4, reviews: 220, stock: 95, gradient: g.lime, icon: "Glasses" },

  // Hostel Essentials
  { id: "p21", name: "Study Lamp Pro", description: "Dimmable LED desk lamp with USB charging and 3 color temperatures.", category: "Hostel Essentials", price: 1299, originalPrice: 1999, rating: 4.8, reviews: 2340, stock: 67, badge: "Trending", gradient: g.amber, icon: "Lamp" },
  { id: "p22", name: "Stackable Storage Organizer", description: "6-compartment modular organizer for desk, closet, or under-bed storage.", category: "Hostel Essentials", price: 899, originalPrice: 1499, rating: 4.5, reviews: 670, stock: 42, gradient: g.emerald, icon: "Package" },
  { id: "p23", name: "Insulated Water Bottle 1L", description: "Vacuum-insulated steel bottle, keeps cold 24h / hot 12h.", category: "Hostel Essentials", price: 699, originalPrice: 1199, rating: 4.7, reviews: 1890, stock: 134, gradient: g.sky, icon: "Coffee" },
  { id: "p24", name: "Extension Board 6-Socket", description: "Surge-protected 6-socket board with individual switches and USB ports.", category: "Hostel Essentials", price: 849, originalPrice: 1299, rating: 4.6, reviews: 980, stock: 58, gradient: g.rose, icon: "Plug" },
  { id: "p25", name: "Foldable Laundry Basket", description: "Collapsible mesh laundry hamper with handles, fits in any hostel corner.", category: "Hostel Essentials", price: 449, originalPrice: 699, rating: 4.4, reviews: 340, stock: 76, gradient: g.lime, icon: "ShoppingBasket" },
  { id: "p26", name: "Campus Backpack 30L", description: "Water-resistant laptop backpack with USB port and hidden pockets.", category: "Hostel Essentials", price: 1899, originalPrice: 2999, rating: 4.7, reviews: 1450, stock: 49, badge: "New", gradient: g.indigo, icon: "Backpack" },
  { id: "p27", name: "Bedside Caddy Organizer", description: "Hangs by your bed — holds phone, books, charger, and water bottle.", category: "Hostel Essentials", price: 549, originalPrice: 899, rating: 4.5, reviews: 230, stock: 88, gradient: g.amber, icon: "Bed" },

  // Stationery
  { id: "p28", name: "Premium Notebook Set (5-Pack)", description: "A5 dotted notebooks, 200 GSM paper, leather-feel cover.", category: "Stationery", price: 599, originalPrice: 999, rating: 4.7, reviews: 1230, stock: 145, gradient: g.indigo, icon: "Notebook" },
  { id: "p29", name: "Gel Pen Set (12-Pack)", description: "Smooth-flow 0.5mm gel pens in classic colors, no smudging.", category: "Stationery", price: 249, originalPrice: 399, rating: 4.6, reviews: 890, stock: 230, gradient: g.emerald, icon: "Pen" },
  { id: "p30", name: "Sticky Notes Mega Pack", description: "500 sticky notes in 5 colors, perfect for revision and reminders.", category: "Stationery", price: 199, originalPrice: 349, rating: 4.5, reviews: 560, stock: 178, gradient: g.amber, icon: "StickyNote" },
  { id: "p31", name: "Desk Organizer Tray", description: "Multi-slot wooden desk organizer for pens, sticky notes, and supplies.", category: "Stationery", price: 449, originalPrice: 749, rating: 4.6, reviews: 340, stock: 67, gradient: g.rose, icon: "Inbox" },
  { id: "p32", name: "Highlighter Set Pastel", description: "6 pastel highlighters with chisel tip, ideal for study notes.", category: "Stationery", price: 199, originalPrice: 329, rating: 4.7, reviews: 780, stock: 198, gradient: g.lime, icon: "Highlighter" },
  { id: "p33", name: "Planner & Diary 2026", description: "Hardcover yearly planner with weekly spreads and goal tracking.", category: "Stationery", price: 449, originalPrice: 699, rating: 4.8, reviews: 540, stock: 88, gradient: g.sky, icon: "CalendarDays" },

  // Career Resources
  { id: "p34", name: "Resume Templates Pack", description: "50 ATS-friendly resume templates curated by recruiters at top tech firms.", category: "Career Resources", price: 299, originalPrice: 599, rating: 4.8, reviews: 2340, stock: 999, badge: "Digital", gradient: g.indigo, icon: "FileText" },
  { id: "p35", name: "Interview Prep Kit", description: "Behavioral + technical interview question bank with model answers.", category: "Career Resources", price: 499, originalPrice: 999, rating: 4.9, reviews: 1890, stock: 999, gradient: g.emerald, icon: "MessageSquare" },
  { id: "p36", name: "Coding Roadmap Bundle", description: "Curated learning paths for SDE, DevOps, ML and frontend roles.", category: "Career Resources", price: 399, originalPrice: 799, rating: 4.8, reviews: 1450, stock: 999, gradient: g.rose, icon: "Map" },
  { id: "p37", name: "Aptitude Prep Master", description: "Quant, logical reasoning, and verbal — placement-ready in 30 days.", category: "Career Resources", price: 549, originalPrice: 999, rating: 4.7, reviews: 1120, stock: 999, gradient: g.amber, icon: "Brain" },
  { id: "p38", name: "LinkedIn Optimization Guide", description: "Step-by-step guide to a recruiter-magnet LinkedIn profile.", category: "Career Resources", price: 249, originalPrice: 499, rating: 4.6, reviews: 670, stock: 999, gradient: g.sky, icon: "Linkedin" },
  { id: "p39", name: "System Design Primer", description: "Master HLD & LLD for senior software engineering interviews.", category: "Career Resources", price: 699, originalPrice: 1299, rating: 4.9, reviews: 980, stock: 999, badge: "Pro", gradient: g.rose, icon: "Network" },
  { id: "p40", name: "Mock Interview Sessions x3", description: "3 live mock interviews with industry mentors + detailed feedback.", category: "Career Resources", price: 1499, originalPrice: 2999, rating: 4.9, reviews: 340, stock: 50, gradient: g.lime, icon: "Video" },
];

export const CATEGORIES: { name: Category; icon: string; gradient: string }[] = [
  { name: "Academic Books", icon: "BookOpen", gradient: "from-indigo-500 to-violet-500" },
  { name: "Electronics", icon: "Laptop", gradient: "from-cyan-500 to-blue-500" },
  { name: "Academic Tools", icon: "Calculator", gradient: "from-emerald-500 to-teal-500" },
  { name: "Hostel Essentials", icon: "Lamp", gradient: "from-amber-500 to-orange-500" },
  { name: "Stationery", icon: "Notebook", gradient: "from-rose-500 to-pink-500" },
  { name: "Career Resources", icon: "Briefcase", gradient: "from-fuchsia-500 to-purple-500" },
];

export interface Bundle {
  id: string;
  name: string;
  tagline: string;
  items: string[];
  productIds: string[];
  originalPrice: number;
  price: number;
  gradient: string;
  icon: string;
}

export const BUNDLES: Bundle[] = [
  {
    id: "b1",
    name: "First Year Engineering Starter Kit",
    tagline: "Everything you need on day one",
    items: ["Scientific Calculator FX-991", "Notebook Set (5-Pack)", "Engineering Drawing Kit", "Campus Backpack 30L"],
    productIds: ["p15", "p28", "p16", "p26"],
    originalPrice: 6796,
    price: 3999,
    gradient: "from-indigo-600 via-violet-600 to-fuchsia-600",
    icon: "GraduationCap",
  },
  {
    id: "b2",
    name: "Hostel Survival Kit",
    tagline: "Make any hostel feel like home",
    items: ["Study Lamp Pro", "Water Bottle 1L", "Extension Board 6-Socket", "Storage Organizer"],
    productIds: ["p21", "p23", "p24", "p22"],
    originalPrice: 4296,
    price: 2499,
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    icon: "Home",
  },
  {
    id: "b3",
    name: "Coding Essentials Kit",
    tagline: "Ship your first product",
    items: ["Student Pro Laptop 14\"", "Mechanical Keyboard RGB", "Wireless Precision Mouse", "Studio Headphones Pro"],
    productIds: ["p7", "p8", "p9", "p10"],
    originalPrice: 75295,
    price: 59999,
    gradient: "from-fuchsia-600 via-rose-600 to-orange-600",
    icon: "Code",
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
