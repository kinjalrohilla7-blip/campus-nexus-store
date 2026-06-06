import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { z } from "zod";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES, type Category } from "@/lib/products";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/catalog")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Shop — CampusX" }] }),
  component: Catalog,
});

const SORT = ["Popularity", "Newest", "Price: Low → High", "Price: High → Low", "Highest Rated"] as const;

function Catalog() {
  const { category, q } = Route.useSearch();
  const [search, setSearch] = useState(q ?? "");
  const [activeCat, setActiveCat] = useState<Category | null>((category as Category) ?? null);
  const [priceMax, setPriceMax] = useState(100000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<(typeof SORT)[number]>("Popularity");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let r = PRODUCTS.filter((p) => {
      if (activeCat && p.category !== activeCat) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (p.price > priceMax) return false;
      if (p.rating < minRating) return false;
      return true;
    });
    if (sort === "Price: Low → High") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "Price: High → Low") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "Highest Rated") r = [...r].sort((a, b) => b.rating - a.rating);
    if (sort === "Newest") r = [...r].reverse();
    return r;
  }, [activeCat, search, priceMax, minRating, sort]);

  const Filters = (
    <aside className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Category</h3>
        <div className="space-y-1">
          <button
            onClick={() => setActiveCat(null)}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition ${!activeCat ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5"}`}
          >All Categories</button>
          {CATEGORIES.map((c) => (
            <button
              key={c.name}
              onClick={() => setActiveCat(c.name)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition ${activeCat === c.name ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5"}`}
            >{c.name}</button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Max Price: ₹{priceMax.toLocaleString()}</h3>
        <input
          type="range" min={500} max={100000} step={500}
          value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-violet-500"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Min Rating</h3>
        <div className="flex gap-1">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex-1 h-8 rounded-md text-xs font-medium transition ${minRating === r ? "bg-[var(--gradient-primary)] text-white" : "glass hover:bg-white/10"}`}
            >{r === 0 ? "Any" : `${r}+`}</button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Availability</h3>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" defaultChecked className="accent-violet-500" /> In Stock Only
        </label>
      </div>
    </aside>
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Shop the Catalog</h1>
          <p className="text-muted-foreground">{PRODUCTS.length} products, hand-curated for students.</p>
        </div>

        <div className="mt-8 flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 shrink-0 hidden lg:block">{Filters}</div>

          <div className="flex-1 min-w-0">
            <div className="flex gap-2 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-10 pl-10 pr-3 rounded-md glass text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <select
                value={sort} onChange={(e) => setSort(e.target.value as any)}
                className="h-10 px-3 rounded-md glass text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {SORT.map((s) => <option key={s} value={s} className="bg-background">{s}</option>)}
              </select>
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden h-10 px-3 rounded-md glass flex items-center gap-2 text-sm"
              ><SlidersHorizontal className="h-4 w-4" /></button>
            </div>

            {filtered.length === 0 ? (
              <div className="surface-card p-16 text-center">
                <p className="text-muted-foreground">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>

        {filtersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setFiltersOpen(false)}>
            <div className="absolute right-0 top-0 bottom-0 w-80 glass-strong p-6 overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold">Filters</h2>
                <button onClick={() => setFiltersOpen(false)}><X className="h-4 w-4" /></button>
              </div>
              {Filters}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
