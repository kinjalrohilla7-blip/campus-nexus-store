import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { toast } from "sonner";

interface CartItem {
  productId: string;
  qty: number;
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  cartCount: number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((c) => c.productId === id);
      if (found) return prev.map((c) => (c.productId === id ? { ...c, qty: c.qty + qty } : c));
      return [...prev, { productId: id, qty }];
    });
    toast.success("Added to cart");
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.productId !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) return setCart((prev) => prev.filter((c) => c.productId !== id));
    setCart((prev) => prev.map((c) => (c.productId === id ? { ...c, qty } : c)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        toast("Removed from wishlist");
        return prev.filter((x) => x !== id);
      }
      toast.success("Saved to wishlist");
      return [...prev, id];
    });
  }, []);

  const inWishlist = useCallback((id: string) => wishlist.includes(id), [wishlist]);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <StoreContext.Provider
      value={{ cart, wishlist, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, inWishlist, cartCount }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
