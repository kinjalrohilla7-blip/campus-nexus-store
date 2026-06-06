import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Truck, ShieldCheck, RotateCcw, ChevronLeft, Zap } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { ProductVisual } from "@/components/ProductVisual";
import { getProduct, PRODUCTS } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.product.name ?? "Product"} — CampusX` }],
  }),
  notFoundComponent: () => (
    <AppShell><div className="mx-auto max-w-3xl px-6 py-20 text-center">Product not found.</div></AppShell>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" /> Back to shop
        </Link>

        <div className="mt-6 grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="surface-card p-6">
              <ProductVisual gradient={product.gradient} icon={product.icon} className="aspect-square" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="surface-card p-2 cursor-pointer hover:border-violet-500/50 transition">
                  <ProductVisual gradient={product.gradient} icon={product.icon} className="aspect-square" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-xs uppercase tracking-wider text-violet-400 font-semibold">{product.category}</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">{product.name}</h1>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                ))}
                <span className="ml-1 text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">{product.reviews.toLocaleString()} reviews</span>
              <span className="text-sm text-emerald-400">● {product.stock > 20 ? "In stock" : `Only ${product.stock} left`}</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-bold">₹{product.price.toLocaleString()}</span>
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-400 text-xs font-bold">SAVE {discount}%</span>
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-6 surface-card p-4 grid grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col items-center text-center gap-1">
                <Truck className="h-4 w-4 text-violet-400" /><span className="text-muted-foreground">Free 2-day shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /><span className="text-muted-foreground">1 year warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <RotateCcw className="h-4 w-4 text-cyan-400" /><span className="text-muted-foreground">30-day returns</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center glass rounded-md">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-11 w-11 grid place-items-center hover:bg-white/5">−</button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-11 w-11 grid place-items-center hover:bg-white/5">+</button>
              </div>
              <button
                onClick={() => addToCart(product.id, qty)}
                className="flex-1 h-11 rounded-md bg-[var(--gradient-primary)] text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition shadow-lg shadow-violet-500/30"
              ><ShoppingCart className="h-4 w-4" /> Add to Cart</button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`h-11 w-11 rounded-md grid place-items-center transition ${inWishlist(product.id) ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "glass hover:bg-white/10"}`}
              ><Heart className={`h-4 w-4 ${inWishlist(product.id) ? "fill-current" : ""}`} /></button>
            </div>
            <Link to="/checkout" className="mt-3 w-full h-11 rounded-md glass font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition">
              <Zap className="h-4 w-4 text-amber-400" /> Buy Now
            </Link>
          </motion.div>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold">Specifications</h2>
            <div className="mt-4 surface-card divide-y divide-border/50">
              {[
                ["Category", product.category],
                ["Stock", `${product.stock} units`],
                ["Rating", `${product.rating} / 5`],
                ["SKU", `CX-${product.id.toUpperCase()}`],
                ["Warranty", "12 months"],
                ["Returns", "30 days"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold">Reviews</h2>
            <div className="mt-4 surface-card p-6 text-center">
              <div className="text-4xl font-bold text-gradient-brand">{product.rating}</div>
              <div className="mt-1 flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{product.reviews.toLocaleString()} reviews</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold">You may also like</h2>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
