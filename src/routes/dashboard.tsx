import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Package, Heart, MapPin, Eye, User, ChevronRight, Truck, CheckCircle2, Clock } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductVisual } from "@/components/ProductVisual";
import { PRODUCTS, getProduct } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — CampusX" }] }),
  component: Dashboard,
});

const TABS = [
  { id: "overview", label: "Overview", Icon: User },
  { id: "orders", label: "Orders", Icon: Package },
  { id: "wishlist", label: "Wishlist", Icon: Heart },
  { id: "addresses", label: "Addresses", Icon: MapPin },
  { id: "recent", label: "Recently Viewed", Icon: Eye },
] as const;

const MOCK_ORDERS = [
  { id: "CX-3471Q2", date: "Mar 12, 2026", total: 4299, status: "Delivered", items: ["p8", "p9"] },
  { id: "CX-21K9XL", date: "Mar 02, 2026", total: 549, status: "Delivered", items: ["p1"] },
  { id: "CX-92ABCD", date: "Feb 24, 2026", total: 6796, status: "In Transit", items: ["p15", "p28", "p16"] },
  { id: "CX-77ZYXW", date: "Feb 10, 2026", total: 18999, status: "Delivered", items: ["p12"] },
];

const ADDRESSES = [
  { id: 1, name: "Hostel Address", line: "Block B, Room 412, IIT Campus, Powai", city: "Mumbai 400076", default: true },
  { id: 2, name: "Home Address", line: "B-23, Vasant Vihar", city: "New Delhi 110057" },
];

function Dashboard() {
  const [tab, setTab] = useState<typeof TABS[number]["id"]>("overview");
  const { wishlist } = useStore();
  const wishItems = wishlist.map(getProduct).filter(Boolean) as ReturnType<typeof getProduct>[];

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-[var(--gradient-primary)] grid place-items-center text-white font-bold text-lg glow-primary">AS</div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Arya</h1>
            <p className="text-sm text-muted-foreground">arya.sharma@iitb.ac.in • Member since 2025</p>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="space-y-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${
                  tab === t.id ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5"
                }`}
              >
                <t.Icon className="h-4 w-4" /> {t.label}
                <ChevronRight className="h-3 w-3 ml-auto opacity-50" />
              </button>
            ))}
          </aside>

          <div>
            {tab === "overview" && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "Total Orders", value: "12", Icon: Package, color: "violet" },
                    { label: "In Transit", value: "1", Icon: Truck, color: "amber" },
                    { label: "Wishlist", value: String(wishItems.length), Icon: Heart, color: "rose" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="surface-card p-5"
                    >
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">{s.label}</p>
                        <s.Icon className={`h-4 w-4 text-${s.color}-400`} />
                      </div>
                      <p className="mt-3 text-3xl font-bold">{s.value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="surface-card p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">Recent Orders</h2>
                    <button onClick={() => setTab("orders")} className="text-sm text-violet-400 hover:underline">View all</button>
                  </div>
                  <div className="mt-4 divide-y divide-border/50">
                    {MOCK_ORDERS.slice(0, 3).map((o) => (
                      <OrderRow key={o.id} order={o} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "orders" && (
              <div className="surface-card p-6">
                <h2 className="font-semibold mb-4">All Orders</h2>
                <div className="divide-y divide-border/50">
                  {MOCK_ORDERS.map((o) => <OrderRow key={o.id} order={o} />)}
                </div>
              </div>
            )}

            {tab === "wishlist" && (
              <div>
                {wishItems.length === 0 ? (
                  <div className="surface-card p-12 text-center text-muted-foreground">Your wishlist is empty.</div>
                ) : (
                  <div className="grid sm:grid-cols-3 gap-4">
                    {wishItems.map((p) => p && (
                      <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="surface-card p-3 block hover:border-violet-500/40 transition">
                        <ProductVisual gradient={p.gradient} icon={p.icon} className="aspect-square" />
                        <p className="mt-2 text-sm font-semibold line-clamp-1">{p.name}</p>
                        <p className="text-sm font-bold">₹{p.price.toLocaleString()}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "addresses" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {ADDRESSES.map((a) => (
                  <div key={a.id} className="surface-card p-5">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{a.name}</h3>
                      {a.default && <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">Default</span>}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{a.line}</p>
                    <p className="text-sm text-muted-foreground">{a.city}</p>
                  </div>
                ))}
                <button className="surface-card p-5 border-dashed border-2 border-border text-muted-foreground hover:text-foreground hover:border-violet-500/40 transition flex items-center justify-center">
                  + Add new address
                </button>
              </div>
            )}

            {tab === "recent" && (
              <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {PRODUCTS.slice(10, 18).map((p) => (
                  <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="surface-card p-3 block hover:border-violet-500/40 transition">
                    <ProductVisual gradient={p.gradient} icon={p.icon} className="aspect-square" />
                    <p className="mt-2 text-sm font-semibold line-clamp-1">{p.name}</p>
                    <p className="text-sm font-bold">₹{p.price.toLocaleString()}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function OrderRow({ order }: { order: typeof MOCK_ORDERS[0] }) {
  const statusConf = order.status === "Delivered"
    ? { Icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/15" }
    : { Icon: Clock, color: "text-amber-400 bg-amber-500/15" };
  return (
    <div className="py-4 flex items-center gap-4">
      <div className="flex -space-x-3">
        {order.items.slice(0, 3).map((id) => {
          const p = getProduct(id);
          return p ? <div key={id} className="w-10 h-10 rounded-md ring-2 ring-background overflow-hidden"><ProductVisual gradient={p.gradient} icon={p.icon} className="w-full h-full" /></div> : null;
        })}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{order.id}</p>
        <p className="text-xs text-muted-foreground">{order.date} • {order.items.length} items</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">₹{order.total.toLocaleString()}</p>
        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded mt-1 ${statusConf.color}`}>
          <statusConf.Icon className="h-3 w-3" /> {order.status}
        </span>
      </div>
    </div>
  );
}
