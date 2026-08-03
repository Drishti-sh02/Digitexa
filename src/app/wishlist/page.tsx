"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Check } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";

export default function WishlistPage() {
  const { likedItemIds, cartItems, addToCart, removeFromWishlist } = useCart();
  const { user, loading } = useUser();

  const wishlistProducts = products.filter(p => likedItemIds.includes(p.id));

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
          <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Sign in required</h2>
          <p className="text-subtext mb-8">Sign in to see your wishlist.</p>
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
    <div className="bg-[#050816] min-h-screen text-white pt-10 pb-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-4">Your Wishlist</h1>
            <p className="text-subtext">Products you've liked and saved for later.</p>
          </div>
          {wishlistProducts.length > 0 && (
            <Link 
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl text-white font-medium transition-all shrink-0"
            >
              Back to Store
            </Link>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24 glass rounded-3xl border border-white/10">
            <Heart className="w-16 h-16 text-white/20 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-subtext mb-8">Looks like you haven't liked any premium products yet.</p>
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(110,86,207,0.4)] transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistProducts.map((product) => {
              const inCart = cartItems.some(p => p.id === product.id);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="group rounded-3xl overflow-hidden glass border border-white/10 flex flex-col hover:border-primary/50 transition-all duration-300 shadow-lg relative"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={product.cardImage || product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    
                    {/* Action Icons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="p-2 rounded-full glass border border-white/20 bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-md text-white"
                        title="Remove from Wishlist"
                      >
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={inCart}
                        className="p-2 rounded-full glass border border-white/20 bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-md text-white disabled:opacity-50"
                        title="Add to Cart"
                      >
                        {inCart ? <Check className="w-5 h-5 text-green-400" /> : <ShoppingCart className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white text-center">
                      {product.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
