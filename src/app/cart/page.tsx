"use client";

import { motion } from "framer-motion";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const { user, loading } = useUser();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal;

  if (loading) {
    return (
      <div className="bg-[#050816] min-h-screen pt-32 pb-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#050816] min-h-screen text-white pt-32 pb-24 relative flex items-center justify-center">
        <div className="text-center py-16 px-8 glass rounded-3xl border border-white/10 max-w-md w-full mx-4 shadow-2xl">
          <ShoppingBag className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Sign in required</h2>
          <p className="text-subtext mb-8">Sign in to see your cart.</p>
          <button 
            onClick={() => window.dispatchEvent(new Event("openAuth"))}
            className="inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(110,86,207,0.4)] transition-all"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050816] min-h-screen text-white pt-10 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">Your Shopping Cart</h1>
          <p className="text-subtext">Review your selected digital products before checkout.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 glass rounded-3xl border border-white/10">
            <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-subtext mb-8">Looks like you haven't added any premium products yet.</p>
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(110,86,207,0.4)] transition-all"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.id} 
                  className="flex flex-col sm:flex-row gap-6 p-4 glass rounded-2xl border border-white/10 items-center relative pr-12"
                >
                  <img src={item.cardImage || item.image} alt={item.title} className="w-32 h-24 object-cover rounded-xl" />
                  <div className="flex-grow">
                    <div className="text-xs text-primary mb-1">{item.category}</div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <div className="text-xl font-bold">€{item.price}</div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="glass p-8 rounded-3xl border border-white/10 sticky top-32">
                <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-subtext">
                    <span>Subtotal</span>
                    <span className="text-white">€{subtotal.toFixed(2)}</span>
                  </div>

                </div>
                
                <div className="flex justify-between items-center text-xl font-bold border-t border-white/10 pt-6 mb-8">
                  <span>Total</span>
                  <span className="text-gradient">€{total.toFixed(2)}</span>
                </div>

                <Link 
                  href="/billing"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent py-4 rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(110,86,207,0.4)] transition-all"
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </Link>

                <div className="mt-4 text-center">
                  <Link href="/products" className="text-subtext hover:text-white transition-colors text-sm">
                    or Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
