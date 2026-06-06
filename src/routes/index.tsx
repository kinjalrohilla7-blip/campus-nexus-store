import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Laptop, Calculator, Backpack, Headphones, Lamp,
  ShieldCheck, Truck, Wallet, Star, Tag, Package, GraduationCap, Home, Code,
  BookOpen, Briefcase, Notebook,
} from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ProductCard } from "@/components/ProductCard";
import { AppShell } from "@/components/layout/AppShell";
import { PRODUCTS, CATEGORIES, BUNDLES, getProduct } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusX — Everything a Student Needs" },
      { name: "description", content: "Shop academic essentials, tech, hostel must-haves and career resources crafted for modern students." },
    ],
  }),
  component: Landing,
});

const FLOAT_ITEMS = [
  { Icon: Laptop, x: "10%", y: "20%", size: "h-16 w-16", delay: 0, gradient: "from-indigo-500 to-violet-600" },
  { Icon: Headphones, x: "75%", y: "15%", size: "h-14 w-14", delay: 0.4, gradient: "from-rose-500 to-pink-600" },
  { Icon: Calculator, x: "15%", y: "70%", size: "h-12 w-12", delay: 0.8, gradient: "from-emerald-500 to-teal-600" },
  { Icon: Backpack, x: "80%", y: "65%", size: "h-14 w-14", delay: 0.2, gradient: "from-amber-500 to-orange-600" },
  { Icon: Lamp, x: "50%", y: "78%", size: "h-12 w-12", delay: 0.6, gradient: "from-cyan-500 to-blue-600" },
];

function Landing() {
  const featured = PRODUCTS.slice(0, 8);
  return (
    <AppShell>
      <Hero />
      <Stats />
      <Categories />
      <Featured products={featured} />
      <Bundles />
      <WhyUs />
      <Testimonials />
      <CTA />
    </AppShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-hero)] pointer-events-none" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_120%,oklch(0.65_0.24_295/0.15),transparent_60%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium"
            >
              <Sparkles className="h-3 w-3 text-violet-400" />
              <span>New: Semester Starter Bundles</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              Everything a Student Needs.{" "}
              <span className="text-gradient-brand">One Superstore.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl"
            >
              Shop academic essentials, productivity gear, hostel must-haves, study resources, and tech products designed for modern students.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/catalog" className="group h-12 px-6 rounded-lg bg-[var(--gradient-primary)] text-white font-semibold flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)]">
                Shop Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/catalog" className="h-12 px-6 rounded-lg glass font-semibold flex items-center hover:bg-white/10 transition">
                Explore Categories
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="mt-10 flex items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-1">
                <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</div>
                <span className="ml-1">4.9 rating</span>
              </div>
              <div>Trusted across <span className="text-foreground font-semibold">200+ campuses</span></div>
            </motion.div>
          </div>

          <div className="relative h-[480px] hidden lg:block">
            <div className="absolute inset-0 rounded-3xl glass-strong overflow-hidden">
              <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_50%,oklch(0.65_0.24_295/0.2),transparent_60%)]" />
              {FLOAT_ITEMS.map(({ Icon, x, y, size, delay, gradient }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + delay, type: "spring", stiffness: 200, damping: 18 }}
                  style={{ left: x, top: y }}
                  className="absolute"
                >
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay }}
                    className={`${size} rounded-2xl bg-gradient-to-br ${gradient} grid place-items-center shadow-2xl relative`}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
                    <Icon className="h-1/2 w-1/2 text-white relative" strokeWidth={1.5} />
                    <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${gradient} opacity-30 blur-2xl -z-10`} />
                  </motion.div>
                </motion.div>
              ))}
              <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-emerald-500/20 text-emerald-400 grid place-items-center">
                  <Tag className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold">Save up to 40%</p>
                  <p className="text-muted-foreground">on Starter Bundles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: 10000, suffix: "+", label: "Students Served" },
    { value: 500, suffix: "+", label: "Products" },
    { value: 50, suffix: "+", label: "Categories" },
    { value: 95, suffix: "%", label: "Satisfaction Rate" },
  ];
  return (
    <section className="border-y border-border/50 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl sm:text-5xl font-bold text-gradient-brand">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const CAT_ICONS: Record<string, any> = { BookOpen, Laptop, Calculator, Lamp, Notebook, Briefcase };

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <SectionHeader eyebrow="Browse" title="Shop by Category" subtitle="From textbooks to tech — curated for student life." />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat, i) => {
          const Icon = CAT_ICONS[cat.icon] ?? Package;
          const count = PRODUCTS.filter((p) => p.category === cat.name).length;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to="/catalog"
                search={{ category: cat.name }}
                className="group relative block surface-card p-6 overflow-hidden hover:border-white/15 transition-all hover:-translate-y-1"
              >
                <div className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${cat.gradient} opacity-20 blur-2xl group-hover:opacity-40 transition`} />
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${cat.gradient} grid place-items-center relative`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-semibold">{cat.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{count} products</p>
                <ArrowRight className="absolute top-6 right-6 h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Featured({ products }: { products: typeof PRODUCTS }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="flex items-end justify-between gap-4">
        <SectionHeader eyebrow="Featured" title="Top Picks This Week" subtitle="Hand-selected by our student curators." />
        <Link to="/catalog" className="hidden sm:flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}

const BUNDLE_ICONS: Record<string, any> = { GraduationCap, Home, Code };

function Bundles() {
  const { addToCart } = useStore();
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <SectionHeader eyebrow="Bundles" title="Student Starter Bundles" subtitle="Hand-packed kits that save you money — and decision fatigue." />
      <div className="mt-12 grid lg:grid-cols-3 gap-6">
        {BUNDLES.map((bundle, i) => {
          const Icon = BUNDLE_ICONS[bundle.icon] ?? Package;
          const savings = Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100);
          return (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${bundle.gradient} opacity-50 group-hover:opacity-80 transition blur-sm`} />
              <div className="relative surface-card p-6 h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${bundle.gradient} grid place-items-center shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-400 text-xs font-bold">
                    Save {savings}%
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold">{bundle.name}</h3>
                <p className="text-sm text-muted-foreground">{bundle.tagline}</p>
                <ul className="mt-4 space-y-2 flex-1">
                  {bundle.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">₹{bundle.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{bundle.originalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => bundle.productIds.forEach((id) => getProduct(id) && addToCart(id))}
                    className={`mt-3 w-full h-11 rounded-lg bg-gradient-to-r ${bundle.gradient} text-white font-semibold hover:scale-[1.02] active:scale-[0.98] transition shadow-lg`}
                  >
                    Add Bundle to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { Icon: GraduationCap, title: "Student Focused", desc: "Every product chosen by students, for students." },
    { Icon: Wallet, title: "Affordable Pricing", desc: "Budget-friendly without compromising on quality." },
    { Icon: ShieldCheck, title: "Verified Products", desc: "Authentic brands and quality-checked items." },
    { Icon: Truck, title: "Fast Delivery", desc: "2-day shipping to all major campus locations." },
    { Icon: Package, title: "Bundle Discounts", desc: "Save up to 40% on curated starter packs." },
    { Icon: Tag, title: "Campus Deals", desc: "Exclusive promos during freshers & exam season." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <SectionHeader eyebrow="Why CampusX" title="Built for the campus you live on." />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05 }}
            className="surface-card p-6 hover:border-white/15 transition group"
          >
            <div className="h-10 w-10 rounded-lg glass grid place-items-center group-hover:bg-violet-500/20 group-hover:text-violet-300 transition">
              <it.Icon className="h-4 w-4" />
            </div>
            <h3 className="mt-4 font-semibold">{it.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { name: "Ananya Mehta", role: "IIT Bombay, CSE '27", text: "The Coding Essentials bundle had everything I needed on day one. Saved me hours of comparing products.", avatar: "AM" },
    { name: "Rohan Kumar", role: "BITS Pilani, EE '26", text: "Calculator + drawing kit arrived in 2 days. Honestly better priced than anything on campus.", avatar: "RK" },
    { name: "Priya Sharma", role: "VIT Vellore, IT '28", text: "Love the hostel kit — the storage organizer alone is worth it. Feels like a real product company.", avatar: "PS" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <SectionHeader eyebrow="Loved by students" title="Real reviews from real campuses." />
      <div className="mt-12 grid md:grid-cols-3 gap-4">
        {t.map((q, i) => (
          <motion.div
            key={q.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="surface-card p-6"
          >
            <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
            <p className="mt-4 text-sm leading-relaxed">{q.text}</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[var(--gradient-primary)] grid place-items-center text-sm font-bold text-white">
                {q.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold">{q.name}</p>
                <p className="text-xs text-muted-foreground">{q.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl glass-strong p-12 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.24_295/0.25),transparent_70%)]" />
        <div className="relative">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Your <span className="text-gradient-brand">semester</span> starts here.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Join 10,000+ students who shop smarter every semester.
          </p>
          <Link to="/catalog" className="mt-8 inline-flex h-12 px-8 items-center gap-2 rounded-lg bg-[var(--gradient-primary)] text-white font-semibold shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] hover:scale-105 transition">
            Start Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-semibold">{eyebrow}</p>
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground max-w-xl">{subtitle}</p>}
    </div>
  );
}
