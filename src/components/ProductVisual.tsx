import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function ProductVisual({ gradient, icon, className = "" }: { gradient: string; icon: string; className?: string }) {
  const Icon = ((Icons as unknown) as Record<string, LucideIcon>)[icon] ?? Icons.Package;
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 grid place-items-center">
        <Icon className="h-12 w-12 text-white/90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]" strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
