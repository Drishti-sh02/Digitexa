"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Check, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const TARGET_PRODUCTS = ["secret-of-the-universe", "wonders-of-earth-vol1", "future-technologies-ai-vol1"];

export default function MarketplacePage() {
  const router = useRouter();
  const { cartItems, likedItemIds, downloadItemIds, addToCart, removeFromCart, addToWishlist, removeFromWishlist } = useCart();

  const displayedProducts = products.filter(p => TARGET_PRODUCTS.includes(p.id));

  const handleToggleCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    e.preventDefault();
    if (cartItems.some(p => p.id === product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const handleToggleLike = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    e.preventDefault();
    if (likedItemIds.includes(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };



  return (
    <div className="bg-[#050816] min-h-screen text-white pt-10 pb-24 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Product Grid */}
        <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-12">
          {displayedProducts.map((product) => {
            const inCart = cartItems.some(p => p.id === product.id);
            const isLiked = likedItemIds.includes(product.id);
            const isPurchased = downloadItemIds.includes(product.id);

            return (
              <Link key={product.id} href={`/products/${product.id}`} className="flex h-full">
                <motion.div
                  layoutId={`card-${product.id}`}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer rounded-3xl overflow-hidden glass border border-white/10 flex flex-col hover:border-primary/50 transition-all duration-300 shadow-lg w-full sm:w-[280px] shrink-0 h-full"
                >
                <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                  <motion.img 
                    layoutId={`image-${product.id}`}
                    src={product.cardImage || product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  {/* Action Icons */}
                  {!isPurchased && (
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button
                        onClick={(e) => handleToggleLike(e, product)}
                        className="p-2 rounded-full glass border border-white/20 bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-md text-white"
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                      <button
                        onClick={(e) => handleToggleCart(e, product)}
                        className={`p-2 rounded-full glass border border-white/20 transition-colors backdrop-blur-md text-white ${inCart ? 'bg-green-500/20 hover:bg-green-500/40 border-green-500/50' : 'bg-black/40 hover:bg-black/60'}`}
                        title={inCart ? "Remove from Cart" : "Add to Cart"}
                      >
                        {inCart ? <Check className="w-5 h-5 text-green-400" /> : <ShoppingCart className="w-5 h-5" />}
                      </button>
                    </div>
                  )}
                  {isPurchased && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Purchased
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col items-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold tracking-wider uppercase mb-3">
                    <Book className="w-3 h-3" />
                    eBook
                  </div>
                  <motion.h3 layoutId={`title-${product.id}`} className="text-xl font-bold text-white text-center">
                    {product.title}
                  </motion.h3>
                  <div className="mt-3 text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    €{product.price}
                  </div>
                </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
