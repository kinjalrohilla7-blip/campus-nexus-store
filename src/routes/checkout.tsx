import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, CreditCard, Smartphone, Building2, Landmark, ShieldCheck, ArrowLeft, ArrowRight, PartyPopper } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — CampusX" }] }),
  component: Checkout,
});

const STEPS = ["Shipping", "Payment", "Review", "Success"] as const;

function Checkout() {
  const [step, setStep] = useState(0);
  const { cart, clearCart } = useStore();
  const [shipping, setShipping] = useState({ name: "", phone: "", address: "", city: "", pin: "" });
  const [pay, setPay] = useState<"upi" | "card" | "debit" | "netbank">("upi");

  const items = cart.map((c) => ({ ...c, product: getProduct(c.productId)! })).filter((i) => i.product);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const total = subtotal + (subtotal > 5000 ? 0 : 99);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>

        <div className="mt-8 flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full grid place-items-center text-sm font-bold transition ${
                  i < step ? "bg-emerald-500 text-white" : i === step ? "bg-[var(--gradient-primary)] text-white glow-primary" : "glass text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`mt-2 text-xs font-medium ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-2 mb-6 bg-border relative overflow-hidden">
                  <div className={`absolute inset-0 bg-emerald-500 transition-transform origin-left ${i < step ? "scale-x-100" : "scale-x-0"}`} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="surface-card p-6"
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Shipping Information</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input label="Full Name" value={shipping.name} onChange={(v) => setShipping({ ...shipping, name: v })} />
                      <Input label="Phone" value={shipping.phone} onChange={(v) => setShipping({ ...shipping, phone: v })} />
                    </div>
                    <Input label="Address" value={shipping.address} onChange={(v) => setShipping({ ...shipping, address: v })} />
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input label="City" value={shipping.city} onChange={(v) => setShipping({ ...shipping, city: v })} />
                      <Input label="PIN" value={shipping.pin} onChange={(v) => setShipping({ ...shipping, pin: v })} />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Payment Method</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { id: "upi", label: "UPI", Icon: Smartphone, desc: "PhonePe, GPay, Paytm" },
                        { id: "card", label: "Credit Card", Icon: CreditCard, desc: "Visa, Mastercard" },
                        { id: "debit", label: "Debit Card", Icon: CreditCard, desc: "All major banks" },
                        { id: "netbank", label: "Net Banking", Icon: Landmark, desc: "All Indian banks" },
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setPay(p.id as any)}
                          className={`text-left p-4 rounded-lg border transition ${
                            pay === p.id ? "border-violet-500 bg-violet-500/10" : "border-border glass hover:bg-white/5"
                          }`}
                        >
                          <p.Icon className="h-5 w-5 text-violet-400" />
                          <p className="mt-2 font-semibold text-sm">{p.label}</p>
                          <p className="text-xs text-muted-foreground">{p.desc}</p>
                        </button>
                      ))}
                    </div>
                    {pay === "card" || pay === "debit" ? (
                      <div className="space-y-3 pt-4">
                        <Input label="Card Number" placeholder="1234 5678 9012 3456" />
                        <div className="grid grid-cols-2 gap-3">
                          <Input label="Expiry" placeholder="MM/YY" />
                          <Input label="CVV" placeholder="123" />
                        </div>
                      </div>
                    ) : pay === "upi" ? (
                      <Input label="UPI ID" placeholder="yourname@upi" />
                    ) : (
                      <Input label="Select Bank" placeholder="State Bank of India" />
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Your payment is encrypted and secure.
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Review your order</h2>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Shipping to</h3>
                      <p className="mt-1">{shipping.name || "Guest Student"}, {shipping.address || "Hostel Block, Campus"}, {shipping.city || "City"} {shipping.pin}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Payment</h3>
                      <p className="mt-1 capitalize">{pay === "netbank" ? "Net Banking" : pay}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Items ({items.length})</h3>
                      <div className="mt-2 space-y-1 text-sm">
                        {items.map((i) => (
                          <div key={i.productId} className="flex justify-between">
                            <span>{i.product.name} × {i.qty}</span>
                            <span>₹{(i.product.price * i.qty).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="py-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                      className="mx-auto h-20 w-20 rounded-full bg-emerald-500/20 grid place-items-center glow-emerald"
                    >
                      <PartyPopper className="h-10 w-10 text-emerald-400" />
                    </motion.div>
                    <h2 className="mt-6 text-3xl font-bold">Order placed!</h2>
                    <p className="mt-2 text-muted-foreground">Order #CX-{Math.random().toString(36).slice(2, 8).toUpperCase()} • You'll get a confirmation soon.</p>
                    <div className="mt-8 flex justify-center gap-3">
                      <Link to="/dashboard" className="h-11 px-6 rounded-md bg-[var(--gradient-primary)] text-white font-semibold flex items-center">View Orders</Link>
                      <Link to="/catalog" className="h-11 px-6 rounded-md glass font-semibold flex items-center">Keep Shopping</Link>
                    </div>
                  </div>
                )}

                {step < 3 && (
                  <div className="mt-8 flex justify-between">
                    <button onClick={back} disabled={step === 0} className="h-10 px-5 rounded-md glass text-sm font-medium flex items-center gap-2 disabled:opacity-40 hover:bg-white/10">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      onClick={() => {
                        if (step === 2) clearCart();
                        next();
                      }}
                      className="h-10 px-5 rounded-md bg-[var(--gradient-primary)] text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-violet-500/30"
                    >
                      {step === 2 ? "Place Order" : "Continue"} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="surface-card p-6 h-fit">
            <h3 className="font-semibold">Summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{subtotal > 5000 ? "Free" : "₹99"}</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string; value?: string; onChange?: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <input
        value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder}
        className="w-full h-10 px-3 rounded-md glass text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
  );
}
