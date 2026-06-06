import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Package, TrendingUp, Users, IndianRupee, Plus, Edit2, Trash2, Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductVisual } from "@/components/ProductVisual";
import { PRODUCTS } from "@/lib/products";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — CampusX" }] }),
  component: Admin,
});

const SALES = [42, 38, 55, 60, 48, 72, 80, 68, 95, 88, 110, 132];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const RECENT_ORDERS = [
  { id: "CX-9X4K2", customer: "Rohan K.", amount: 4299, status: "Processing" },
  { id: "CX-8J3M9", customer: "Priya S.", amount: 12499, status: "Shipped" },
  { id: "CX-7P2L8", customer: "Ananya M.", amount: 549, status: "Delivered" },
  { id: "CX-6N1Q5", customer: "Vikram T.", amount: 18999, status: "Processing" },
  { id: "CX-5W8R3", customer: "Sneha P.", amount: 2199, status: "Delivered" },
];

function Admin() {
  const [tab, setTab] = useState<"overview" | "products" | "orders" | "customers">("overview");
  const [search, setSearch] = useState("");

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
            <p className="text-sm text-muted-foreground">Real-time analytics, products & orders.</p>
          </div>
          <div className="flex gap-1 glass rounded-lg p-1">
            {(["overview", "products", "orders", "customers"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-md text-sm capitalize transition ${
                  tab === t ? "bg-[var(--gradient-primary)] text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >{t}</button>
            ))}
          </div>
        </div>

        {tab === "overview" && (
          <>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Revenue", value: 2483920, prefix: "₹", trend: "+12.4%", up: true, Icon: IndianRupee, color: "violet" },
                { label: "Orders", value: 1284, trend: "+8.2%", up: true, Icon: Package, color: "emerald" },
                { label: "Customers", value: 10247, trend: "+18.7%", up: true, Icon: Users, color: "cyan" },
                { label: "Conversion", value: 4.8, suffix: "%", trend: "-0.6%", up: false, Icon: TrendingUp, color: "amber" },
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
                  <p className="mt-3 text-3xl font-bold">
                    {s.prefix}<AnimatedCounter value={s.value} suffix={s.suffix ?? ""} />
                  </p>
                  <div className={`mt-2 text-xs flex items-center gap-1 ${s.up ? "text-emerald-400" : "text-rose-400"}`}>
                    {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {s.trend} vs last month
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 surface-card p-6">
                <div className="flex justify-between">
                  <h2 className="font-semibold">Sales Overview</h2>
                  <span className="text-xs text-muted-foreground">Last 12 months</span>
                </div>
                <div className="mt-6 flex items-end gap-2 h-48">
                  {SALES.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(v / Math.max(...SALES)) * 100}%` }}
                        transition={{ duration: 0.7, delay: i * 0.04 }}
                        className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-fuchsia-500 relative group cursor-pointer"
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-[10px] font-bold bg-foreground text-background rounded px-1.5 py-0.5">
                          ₹{v}k
                        </div>
                      </motion.div>
                      <span className="text-[10px] text-muted-foreground">{MONTHS[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-card p-6">
                <h2 className="font-semibold">Recent Orders</h2>
                <div className="mt-4 space-y-3">
                  {RECENT_ORDERS.map((o) => (
                    <div key={o.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{o.id}</p>
                        <p className="text-xs text-muted-foreground">{o.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{o.amount.toLocaleString()}</p>
                        <p className={`text-[10px] ${o.status === "Delivered" ? "text-emerald-400" : o.status === "Shipped" ? "text-cyan-400" : "text-amber-400"}`}>{o.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "products" && (
          <div className="mt-8">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-10 pl-10 pr-3 rounded-md glass text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <button onClick={() => toast.success("Add product modal would open")} className="h-10 px-4 rounded-md bg-[var(--gradient-primary)] text-white text-sm font-semibold flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Product
              </button>
            </div>

            <div className="surface-card overflow-hidden">
              <div className="grid grid-cols-[1fr_120px_100px_100px_100px] gap-4 px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground border-b border-border/50">
                <span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span className="text-right">Actions</span>
              </div>
              <div className="divide-y divide-border/50 max-h-[600px] overflow-auto">
                {PRODUCTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())).map((p) => (
                  <div key={p.id} className="grid grid-cols-[1fr_120px_100px_100px_100px] gap-4 px-4 py-3 items-center text-sm hover:bg-white/5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 shrink-0"><ProductVisual gradient={p.gradient} icon={p.icon} className="w-full h-full" /></div>
                      <span className="font-medium truncate">{p.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground truncate">{p.category}</span>
                    <span>₹{p.price.toLocaleString()}</span>
                    <span className={p.stock < 30 ? "text-amber-400" : "text-emerald-400"}>{p.stock}</span>
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => toast("Edit product")} className="h-7 w-7 grid place-items-center glass rounded hover:bg-white/10"><Edit2 className="h-3 w-3" /></button>
                      <button onClick={() => toast.error("Delete (mock)")} className="h-7 w-7 grid place-items-center glass rounded hover:bg-rose-500/20 hover:text-rose-400"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="mt-8 surface-card overflow-hidden">
            <div className="grid grid-cols-4 gap-4 px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground border-b border-border/50">
              <span>Order ID</span><span>Customer</span><span>Amount</span><span>Status</span>
            </div>
            <div className="divide-y divide-border/50">
              {[...RECENT_ORDERS, ...RECENT_ORDERS].map((o, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3 text-sm hover:bg-white/5">
                  <span className="font-medium">{o.id}</span>
                  <span>{o.customer}</span>
                  <span className="font-semibold">₹{o.amount.toLocaleString()}</span>
                  <span><span className={`px-2 py-0.5 rounded text-xs ${o.status === "Delivered" ? "bg-emerald-500/15 text-emerald-400" : o.status === "Shipped" ? "bg-cyan-500/15 text-cyan-400" : "bg-amber-500/15 text-amber-400"}`}>{o.status}</span></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "customers" && (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Rohan Kumar", "Priya Sharma", "Ananya Mehta", "Vikram Tiwari", "Sneha Patel", "Arjun Menon"].map((name, i) => (
              <div key={name} className="surface-card p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[var(--gradient-primary)] grid place-items-center text-white font-bold">
                  {name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{name}</p>
                  <p className="text-xs text-muted-foreground">Member · {12 - i} orders</p>
                </div>
                <p className="text-sm font-bold">₹{((i + 1) * 3200).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
