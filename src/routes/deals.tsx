import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Flame, Calendar, GraduationCap, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/deals")({
  head: () => ({ meta: [{ title: "Student Deals — CampusX" }] }),
  component: Deals,
});

const PROMOS = [
  { id: "freshers", title: "Freshers Special", subtitle: "Up to 50% off your first semester essentials", gradient: "from-indigo-600 via-violet-600 to-fuchsia-600", Icon: Sparkles, off: "50%" },
  { id: "btc", title: "Back to College", subtitle: "Restock your hostel — flat 30% off across the board", gradient: "from-emerald-600 via-teal-600 to-cyan-600", Icon: GraduationCap, off: "30%" },
  { id: "sem", title: "Semester End Sale", subtitle: "Trade in old textbooks, save big on new ones", gradient: "from-amber-600 via-orange-600 to-rose-600", Icon: Calendar, off: "40%" },
  { id: "exam", title: "Exam Preparation Sale", subtitle: "Calculators, notebooks & resources on heavy discount", gradient: "from-rose-600 via-pink-600 to-fuchsia-600", Icon: Flame, off: "35%" },
];

function Deals() {
  const dealProducts = [...PRODUCTS].sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price)).slice(0, 8);
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-semibold">Limited time</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">Student <span className="text-gradient-brand">Deals</span></h1>
          <p className="mt-3 text-muted-foreground">Promos hand-picked for every stage of campus life.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {PROMOS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <Link to="/catalog" className={`relative block overflow-hidden rounded-2xl bg-gradient-to-br ${p.gradient} p-8 min-h-[200px] hover:scale-[1.01] transition-transform`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
                <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition" />
                <div className="relative">
                  <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur grid place-items-center">
                      <p.Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-bold">UP TO {p.off} OFF</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-white/80 text-sm max-w-sm">{p.subtitle}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white">
                    Shop now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-2xl font-bold">Biggest savings right now</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dealProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
