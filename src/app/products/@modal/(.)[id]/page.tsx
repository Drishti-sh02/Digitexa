"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Zap, X, Check, Book } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";

export default function InterceptedProductModal() {
  const router = useRouter();
  const params = useParams();
  const { cartItems, likedItemIds, downloadItemIds, addToCart, removeFromCart, addToWishlist, removeFromWishlist } = useCart();
  const { user } = useUser();
  const selectedProduct = products.find(p => p.id === params.id);
  const [showAuthReminder, setShowAuthReminder] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleBuyNow = (product: Product) => {
    if (!user) {
      setShowAuthReminder(true);
      return;
    }
    addToCart(product);
    router.push("/cart");
  };

  const handleClose = () => {
    router.back();
  };

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overscroll-none">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        layoutId={`card-${selectedProduct.id}`}
        className="relative m-auto w-full max-w-3xl max-h-[90vh] glass border border-white/20 rounded-3xl shadow-2xl flex flex-col md:flex-row z-10 bg-[#0a0f25] overflow-hidden"
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white/70 hover:text-white border border-white/10 backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Cover Image */}
        <div className="w-full md:w-5/12 relative h-64 md:h-auto border-b md:border-b-0 md:border-r border-white/10 p-6 flex items-center justify-center bg-black/20 shrink-0">
          <motion.img 
            layoutId={`image-${selectedProduct.id}`}
            src={selectedProduct.image} 
            alt={selectedProduct.title}
            className="w-full h-auto max-h-[500px] object-contain rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Modal Content */}
        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between overflow-y-auto min-h-0">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold tracking-wider uppercase">
                <Book className="w-3.5 h-3.5" />
                eBook
              </div>
            </div>
            <motion.h2 layoutId={`title-${selectedProduct.id}`} className="text-2xl font-bold font-heading text-white mb-3">
              {selectedProduct.title}
            </motion.h2>
            <p className="text-subtext text-lg leading-relaxed mb-8 whitespace-pre-line">
              {selectedProduct.description}
            </p>
          </div>

          {downloadItemIds.includes(selectedProduct.id) ? (
            <div className="flex flex-col gap-4 mt-8">
              <div className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-green-500/20 text-green-400 border border-green-500/50 font-bold text-lg">
                <Check className="w-5 h-5" /> Already Purchased
              </div>
              <button 
                onClick={() => router.push("/downloads")}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all text-lg"
              >
                Go to Downloads
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center px-6 py-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    €{selectedProduct.price}
                  </span>
                </div>
                <button 
                  onClick={() => handleBuyNow(selectedProduct)}
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-xl hover:shadow-[0_0_20px_rgba(110,86,207,0.5)] transition-all"
                >
                  <Zap className="w-6 h-6" /> Buy Now
                </button>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    if (!user) {
                      setShowAuthReminder(true);
                      return;
                    }
                    if (cartItems.some(p => p.id === selectedProduct.id)) {
                      removeFromCart(selectedProduct.id);
                    } else {
                      addToCart(selectedProduct);
                    }
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border font-medium transition-all text-lg ${cartItems.some(p => p.id === selectedProduct.id) ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                >
                  {cartItems.some(p => p.id === selectedProduct.id) ? (
                    <><Check className="w-5 h-5" /> In Cart</>
                  ) : (
                    <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                  )}
                </button>
                
                <button 
                  onClick={() => {
                    if (likedItemIds.includes(selectedProduct.id)) {
                      removeFromWishlist(selectedProduct.id);
                    } else {
                      addToWishlist(selectedProduct.id);
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all text-lg"
                >
                  <Heart className={`w-5 h-5 ${likedItemIds.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} /> 
                  {likedItemIds.includes(selectedProduct.id) ? 'Liked' : 'Like'}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Auth Reminder Popup */}
      <AnimatePresence>
        {showAuthReminder && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthReminder(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-[#0a0f25] border border-white/20 shadow-2xl rounded-2xl p-8 z-10 flex flex-col items-center text-center"
            >
              <button 
                onClick={() => setShowAuthReminder(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4 border border-primary/50">
                <Zap className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Sign In Required</h2>
              <p className="text-white/70 mb-6">You must sign in or create an account to buy products.</p>
              <div className="w-full flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setShowAuthReminder(false);
                    handleClose();
                    setTimeout(() => window.dispatchEvent(new Event("openAuth")), 100);
                  }}
                  className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Sign In Now
                </button>
                <button 
                  onClick={() => setShowAuthReminder(false)}
                  className="w-full bg-white/5 text-white border border-white/10 font-medium py-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
