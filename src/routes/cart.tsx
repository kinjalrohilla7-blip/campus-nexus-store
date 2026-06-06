import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, Heart, Tag, ArrowRight } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductVisual } from "@/components/ProductVisual";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — CampusX" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, toggleWishlist } = useStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const items = cart.map((c) => ({ ...c, product: getProduct(c.productId)! })).filter((i) => i.product);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 5000 ? 0 : subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "STUDENT10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success("Coupon applied — 10% off");
    } else {
      toast.error("Invalid coupon");
    }
  };

  if (items.length === 0) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="mx-auto h-20 w-20 rounded-2xl glass grid place-items-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Find something you'll love.</p>
          <Link to="/catalog" className="mt-6 inline-flex h-11 px-6 items-center rounded-md bg-[var(--gradient-primary)] text-white font-semibold">
            Browse products
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="text-4xl font-bold tracking-tight">Cart</h1>
        <p className="text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</p>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="surface-card p-4 flex gap-4"
                >
                  <div className="w-24 h-24 shrink-0">
                    <ProductVisual gradient={item.product.gradient} icon={item.product.icon} className="h-full w-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.product.category}</p>
                    <Link to="/product/$id" params={{ id: item.product.id }} className="font-semibold hover:text-violet-400 transition block truncate">
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-lg font-bold">₹{item.product.price.toLocaleString()}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center glass rounded-md">
                        <button onClick={() => updateQty(item.productId, item.qty - 1)} className="h-8 w-8 grid place-items-center hover:bg-white/5"><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                        <button onClick={() => updateQty(item.productId, item.qty + 1)} className="h-8 w-8 grid place-items-center hover:bg-white/5"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button
                        onClick={() => { toggleWishlist(item.productId); removeFromCart(item.productId); }}
                        className="h-8 px-3 text-xs glass rounded-md hover:bg-white/10 flex items-center gap-1"
                      ><Heart className="h-3 w-3" /> Save for later</button>
                      <button onClick={() => removeFromCart(item.productId)} className="h-8 w-8 grid place-items-center glass rounded-md hover:bg-rose-500/20 hover:text-rose-400 transition">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{(item.product.price * item.qty).toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="surface-card p-6 sticky top-24">
              <h2 className="font-semibold">Order Summary</h2>

              <div className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    value={coupon} onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Try STUDENT10"
                    className="w-full h-9 pl-9 pr-3 rounded-md glass text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <button onClick={applyCoupon} className="h-9 px-4 rounded-md glass text-sm font-medium hover:bg-white/10">Apply</button>
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <Row label="Subtotal" value={`₹${subtotal.toLocaleString()}`} />
                <Row label="Shipping" value={shipping === 0 ? "Free" : `₹${shipping}`} />
                {discount > 0 && <Row label="Discount" value={`−₹${discount.toLocaleString()}`} accent />}
                <p className="text-xs text-muted-foreground pt-2">Estimated delivery: 2–3 business days</p>
              </div>

              <div className="mt-4 pt-4 border-t border-border/50 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">₹{total.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="mt-6 w-full h-11 rounded-md bg-[var(--gradient-primary)] text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition shadow-lg shadow-violet-500/30">
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "text-emerald-400 font-medium" : ""}>{value}</span>
    </div>
  );
}
