import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const wished = inWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -4 }}
      className="group relative surface-card overflow-hidden hover:border-white/15 transition-all hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.4)]"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative p-3">
          <ProductVisual gradient={product.gradient} icon={product.icon} className="aspect-square" />
          {product.badge && (
            <span className="absolute top-5 left-5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-black">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-5 right-5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/90 text-white">
              -{discount}%
            </span>
          )}
        </div>
        <div className="p-4 pt-1 space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-gradient-brand transition">{product.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{product.rating}</span>
            <span>({product.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold">₹{product.price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={(e) => { e.preventDefault(); addToCart(product.id); }}
          className="flex-1 h-9 rounded-md bg-[var(--gradient-primary)] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition shadow-lg shadow-violet-500/20"
        >
          <ShoppingCart className="h-3.5 w-3.5" /> Add
        </button>
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className={`h-9 w-9 rounded-md grid place-items-center transition ${
            wished ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "glass hover:bg-white/10"
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${wished ? "fill-current" : ""}`} />
        </button>
      </div>
    </motion.div>
  );
}
