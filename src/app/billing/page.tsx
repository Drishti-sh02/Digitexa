"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, CreditCard, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/hooks/useUser";

export default function BillingPage() {
  const router = useRouter();
  const { cartItems, checkout } = useCart();
  const { user } = useUser();
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");

    if (success === "true") {
      setIsSuccess(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const paypalEmail = process.env.NEXT_PUBLIC_PAYPAL_EMAIL || 'YOUR_PAYPAL_EMAIL_HERE';
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    
    const params = new URLSearchParams({
      cmd: '_cart',
      upload: '1',
      business: paypalEmail,
      currency_code: 'EUR',
      return: `${appUrl}/billing?success=true`,
      cancel_return: `${appUrl}/billing?canceled=true`,
      rm: '2', 
    });

    cartItems.forEach((item, index) => {
      params.append(`item_name_${index + 1}`, item.title);
      params.append(`amount_${index + 1}`, item.price.toString());
    });

    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
    window.location.href = paypalUrl;
  };

  const handleComplete = () => {
    checkout();
    router.push("/downloads");
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="bg-[#050816] min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <h2 className="text-3xl font-bold mb-4">No items to checkout</h2>
          <Link href="/products" className="text-primary hover:underline">Return to Marketplace</Link>
        </div>
      </div>
    );
  }



  return (
    <div className="bg-[#050816] min-h-screen text-white pt-10 pb-24 relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-heading font-bold mb-4">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleCheckout} className="space-y-8">
              <div className="glass p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Payment Method</h3>
                <p className="text-subtext mb-6">You will be redirected to PayPal to complete your purchase securely.</p>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-[#FFC439] text-[#003087] py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(255,196,57,0.4)] transition-all"
                >
                  Pay with PayPal
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-3xl border border-white/10 sticky top-32">
              <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-white/80 line-clamp-1 mr-4">{item.title}</span>
                    <span className="text-white font-medium">€{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xl font-bold border-t border-white/10 pt-6">
                <span>TOTAL</span>
                <span className="text-gradient">€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816]/90 backdrop-blur-sm px-6"
          >
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [1.05, 1], opacity: 1 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
              className="glass max-w-md w-full p-10 rounded-[2rem] border border-white/20 shadow-[0_0_50px_rgba(110,86,207,0.3)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>

              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 border border-green-500/50">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">Thankyou For Purchasing!</h2>
              <p className="text-subtext mb-8">
                Payment successful. Your premium digital products are ready for download.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleComplete}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent py-3 rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(110,86,207,0.4)] transition-all"
                >
                  Go to Downloads <Download className="w-4 h-4" />
                </button>
                <Link
                  href="/products"
                  onClick={checkout}
                  className="w-full flex items-center justify-center py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
