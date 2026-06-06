import { Link } from "@tanstack/react-router";
import { Sparkles, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[var(--gradient-primary)] grid place-items-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">CampusX</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              The student superstore. Built for ambitious campuses.
            </p>
            <div className="mt-4 flex gap-2">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="h-8 w-8 grid place-items-center rounded-md glass hover:bg-white/10 transition">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "Shop", links: [["Catalog", "/catalog"], ["Deals", "/deals"], ["Wishlist", "/wishlist"]] },
            { title: "Account", links: [["Dashboard", "/dashboard"], ["Cart", "/cart"], ["Admin", "/admin"]] },
            { title: "Company", links: [["About", "/"], ["Contact", "/"], ["Careers", "/"]] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2026 CampusX. Crafted for students who build.</p>
          <p>Made with ⚡ in India</p>
        </div>
      </div>
    </footer>
  );
}
