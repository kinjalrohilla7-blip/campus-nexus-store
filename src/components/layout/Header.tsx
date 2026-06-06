import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingCart, Heart, Search, User, Sparkles, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const NAV = [
  { to: "/catalog", label: "Shop" },
  { to: "/deals", label: "Deals" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/admin", label: "Admin" },
];

export function Header() {
  const { cartCount, wishlist } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-border/50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="h-8 w-8 rounded-lg bg-[var(--gradient-primary)] grid place-items-center glow-primary group-hover:scale-110 transition-transform">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight">CampusX</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative px-3 py-2 text-sm rounded-md transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-md bg-white/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/catalog" className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition">
            <Search className="h-4 w-4" />
          </Link>
          <Link to="/wishlist" className="relative h-9 w-9 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition">
            <Heart className="h-4 w-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-rose-500 text-[10px] font-bold grid place-items-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative h-9 w-9 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition">
            <ShoppingCart className="h-4 w-4" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-[var(--gradient-primary)] text-[10px] font-bold grid place-items-center text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link to="/dashboard" className="hidden sm:grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition">
            <User className="h-4 w-4" />
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden h-9 w-9 grid place-items-center rounded-md hover:bg-white/5">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm rounded-md hover:bg-white/5"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
