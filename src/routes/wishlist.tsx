import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductVisual } from "@/components/ProductVisual";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/products";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — CampusX" }] }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean) as ReturnType<typeof getProduct>[];

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <h1 className="text-4xl font-bold tracking-tight">Wishlist</h1>
        <p className="text-muted-foreground">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>

        {items.length === 0 ? (
          <div className="mt-12 surface-card p-16 text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl glass grid place-items-center">
              <Heart className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="mt-4 text-muted-foreground">Tap the heart on anything you like.</p>
            <Link to="/catalog" className="mt-6 inline-flex h-11 px-6 items-center rounded-md bg-[var(--gradient-primary)] text-white font-semibold">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {items.map((p) => p && (
                <motion.div
                  key={p.id} layout
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="surface-card overflow-hidden"
                >
                  <Link to="/product/$id" params={{ id: p.id }} className="block p-3">
                    <ProductVisual gradient={p.gradient} icon={p.icon} className="aspect-square" />
                  </Link>
                  <div className="p-4 pt-0">
                    <h3 className="font-semibold text-sm line-clamp-1">{p.name}</h3>
                    <p className="text-lg font-bold mt-1">₹{p.price.toLocaleString()}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => { addToCart(p.id); toggleWishlist(p.id); }}
                        className="flex-1 h-9 rounded-md bg-[var(--gradient-primary)] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:scale-[1.02] transition"
                      ><ShoppingCart className="h-3.5 w-3.5" /> Move to Cart</button>
                      <button onClick={() => toggleWishlist(p.id)} className="h-9 w-9 grid place-items-center glass rounded-md hover:bg-rose-500/20 hover:text-rose-400">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </AppShell>
  );
}
